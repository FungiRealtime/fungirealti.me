import React from "react";

interface SystemEvent {
  name: string;
  description: string;
}

let systemEvents: SystemEvent[] = [
  {
    name: "fungi:connection_established",
    description:
      "Event sent when the client successfully establishes a connection with the server.",
  },
  {
    name: "fungi:subscription_succeeded",
    description:
      "Event sent when the client successfully subscribes to a channel.",
  },
  {
    name: "fungi:subscription_error",
    description: "Event sent when the client fails to subscribe to a channel.",
  },
  {
    name: "fungi:unsubscription_succeeded",
    description:
      "Event sent when the client successfully unsubscribes from a channel.",
  },
  {
    name: "fungi:error",
    description:
      "Event sent by Fungi when an action attempted by a client fails (like authorization for a private channel).",
  },
  {
    name: "fungi:pong",
    description:
      "Event sent by Fungi in response to pings sent by a client SDK to keep the connection alive.",
  },
];

export function SystemEvents() {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Event name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {systemEvents.map((event) => (
                  <tr key={event.name} className="bg-white">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {event.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {event.description}
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
