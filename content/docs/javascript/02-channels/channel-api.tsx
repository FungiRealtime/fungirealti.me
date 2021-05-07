import React from "react";

let api = [
  {
    name: "bind",
    signature: "bind<TData>;(event: string, handler: EventBindHandler<TData>",
    description: "Binds to an event on the channel.",
    args: [
      { name: "event", description: "The name of the event to bind to." },
      {
        name: "handler",
        description: "The function to run when the event is triggered.",
      },
      { name: "options?", description: "Additional options for the binding." },
    ],
  },
];

export function ChannelAPI() {
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
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {api.map((something) => (
                  <tr key={something.name} className="bg-white">
                    <td className="flex flex-col items-start space-y-6 px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex flex-col space-y-3 items-start">
                        <span className="font-medium">{something.name}</span>
                        <code>{something.signature}</code>
                      </div>

                      <div className="flex flex-col space-y-3 items-start">
                        <span>{something.description}</span>

                        <ul>
                          {something.args.map((arg) => (
                            <li key={arg.name}>
                              {arg.name}: {arg.description}
                            </li>
                          ))}
                        </ul>
                      </div>
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
