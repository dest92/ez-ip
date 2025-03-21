"use client";

import { useState, useEffect, useRef } from "react";
import { IPInfo } from "./types/ip-info";
import SearchForm from "./components/ip-lookup/SearchForm";
import IPInfoDisplay from "./components/ip-lookup/IPInfoDisplay";
import { toast } from "sonner";
import IPLookupService from "./services/IPLookupService";
import Link from "next/link";

export default function Home() {
  const [ipAddress, setIpAddress] = useState("");
  const [userIP, setUserIP] = useState("");
  const [ipInfo, setIpInfo] = useState<IPInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const initialLoadDone = useRef(false);

  // Fetch user's IP on page load - only once
  useEffect(() => {
    if (!initialLoadDone.current) {
      getUserIPOnly();
      initialLoadDone.current = true;
    }
  }, []);

  // Just get the user's IP without fetching details
  const getUserIPOnly = async () => {
    try {
      const userIPAddress = await IPLookupService.getUserIP();
      if (userIPAddress) {
        setUserIP(userIPAddress);
      }
    } catch (err) {
      // Silently fail - we don't want to show errors on initial load
      console.error("Could not get user IP:", err);
    }
  };

  const fetchMyIP = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await IPLookupService.lookupMyIP();
      setUserIP(result.ip);
      setIpAddress(""); // Clear the input field

      if (result.data) {
        setIpInfo(result.data);
        toast.success(
          `Successfully retrieved information for your IP: ${result.ip}`
        );
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch IP information";

      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const fetchIPInfo = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const data = await IPLookupService.lookupIP(ipAddress);
      if (data) {
        setIpInfo(data);
        toast.success(`Successfully retrieved information for IP: ${data.ip}`);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch IP information";

      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            <span className="text-indigo-600 dark:text-indigo-400">EZ</span>-IP
          </h1>
          <h3 className="pt-4 text-gray-900 dark:text-white font-bold">
            By{" "}
            <Link
              href="https://github.com/dest92"
              className="hover:text-indigo-500 transition-colors"
            >
              Acebal Matías
            </Link>
          </h3>
          <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 dark:text-gray-300 sm:text-xl md:mt-5 md:max-w-3xl">
            Get detailed information about any IP address in seconds
          </p>
          {userIP && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Your IP: <span className="font-medium">{userIP}</span>
            </p>
          )}
        </div>

        {/* Search Form */}
        <SearchForm
          ipAddress={ipAddress}
          setIpAddress={setIpAddress}
          onSubmit={fetchIPInfo}
          onMyIPClick={fetchMyIP}
          loading={loading}
          error={error}
        />

        {/* Results */}
        {ipInfo && <IPInfoDisplay ipInfo={ipInfo} />}
      </div>
    </div>
  );
}
