import { IPInfo } from "../../types/ip-info";
import ISPInfo from "./ISPInfo";
import LocationInfo from "./LocationInfo";
import RiskInfo from "./RiskInfo";

interface IPInfoDisplayProps {
  ipInfo: IPInfo;
}

export default function IPInfoDisplay({ ipInfo }: IPInfoDisplayProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            IP Information
          </h3>
          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
            {ipInfo.ip}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <ISPInfo isp={ipInfo.isp} />
        <LocationInfo location={ipInfo.location} />
        <RiskInfo risk={ipInfo.risk} />
      </div>
    </div>
  );
}