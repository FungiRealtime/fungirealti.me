import React from "react";

let supportedLangs = [
  {
    platform: "JavaScript (Browser or Node.js)",
    docs: () => {
      return <a href="/docs/getting-started/javascript">Docs</a>;
    },
    code: () => {
      return (
        <a href="https://github.com/FungiRealtime/fungi-js">
          FungiRealtime/fungi-js
        </a>
      );
    },
  },
];

export function ClientSupportedLangs() {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="py-2 align-middle inline-block min-w-full">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Platform
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Docs
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Code
                  </th>
                </tr>
              </thead>
              <tbody>
                {supportedLangs.map((lang) => (
                  <tr key={lang.platform} className="bg-white">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {lang.platform}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <lang.docs />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <lang.code />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
