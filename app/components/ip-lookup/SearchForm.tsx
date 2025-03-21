"use client";

import { useState, useEffect } from "react";
import { isValidIPInput } from "../../utils/ipValidation";

interface SearchFormProps {
  ipAddress: string;
  setIpAddress: (ip: string) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onMyIPClick: () => Promise<void>;
  loading: boolean;
  error: string;
}

export default function SearchForm({
  ipAddress,
  setIpAddress,
  onSubmit,
  onMyIPClick,
  loading,
  error,
}: SearchFormProps) {
  // Add state to track if error has been shown
  const [errorShown, setErrorShown] = useState(false);
  const [inputError, setInputError] = useState("");

  // Reset error shown state when error changes
  useEffect(() => {
    if (error && !errorShown) {
      setErrorShown(true);
    } else if (!error) {
      setErrorShown(false);
    }
  }, [error, errorShown]);

  // Handle IP address input with validation
  const handleIPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (isValidIPInput(value)) {
      setIpAddress(value);
      setInputError("");
    } else {
      // Don't update the state but show an error message
      setInputError("Please enter a valid IP address format");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden mb-8">
      <div className="px-4 py-5 sm:p-6">
        <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-grow">
            <label htmlFor="ip-address" className="sr-only">
              IP Address
            </label>
            <input
              type="text"
              id="ip-address"
              name="ip-address"
              placeholder="Enter an IP address (e.g., 8.8.8.8)"
              value={ipAddress}
              onChange={handleIPChange}
              className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-lg py-3 px-4 ${
                inputError ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
              }`}
            />
            {inputError && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {inputError}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading || !!inputError}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <svg
                  className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Lookup"
              )}
            </button>
            <button
              type="button"
              onClick={onMyIPClick}
              disabled={loading}
              className="inline-flex items-center px-4 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              My IP
            </button>
          </div>
        </form>
        {error && errorShown && (
          <div className="mt-3 text-sm text-red-600 dark:text-red-400 flex items-center justify-between">
            <p>
              {error.includes("JSON")
                ? "API response format error. The service might be unavailable or requires an API key."
                : error}
            </p>
            <button
              onClick={() => setErrorShown(false)}
              className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
