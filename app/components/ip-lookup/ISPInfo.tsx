import { IPInfo } from "../../types/ip-info";

interface ISPInfoProps {
  isp: IPInfo["isp"];
}

export default function ISPInfo({ isp }: ISPInfoProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
        </svg>
        ISP Information
      </h4>
      <div className="space-y-3">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">ASN</p>
          <p className="mt-1 text-sm text-gray-900 dark:text-white">{isp.asn}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Organization</p>
          <p className="mt-1 text-sm text-gray-900 dark:text-white">{isp.org}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">ISP</p>
          <p className="mt-1 text-sm text-gray-900 dark:text-white">{isp.isp}</p>
        </div>
      </div>
    </div>
  );
}