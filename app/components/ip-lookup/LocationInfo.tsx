import { IPInfo } from "../../types/ip-info";

interface LocationInfoProps {
  location: IPInfo["location"];
}

export default function LocationInfo({ location }: LocationInfoProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
        Location
      </h4>
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Country</p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">{location.country} ({location.country_code})</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">City</p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">{location.city}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">State</p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">{location.state}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Zip Code</p>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">{location.zipcode}</p>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Coordinates</p>
          <p className="mt-1 text-sm text-gray-900 dark:text-white">
            {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Timezone</p>
          <p className="mt-1 text-sm text-gray-900 dark:text-white">{location.timezone}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Local Time</p>
          <p className="mt-1 text-sm text-gray-900 dark:text-white">
            {new Date(location.localtime).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}