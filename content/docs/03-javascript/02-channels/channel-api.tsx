import React from "react";

let api = [
  {
    name: "name",
    signature: "name: boolean",
    description: () => <span>The name of the channel.</span>,
    args: [],
  },
  {
    name: "isSubscribed",
    signature: "isSubscribed: boolean",
    description: () => (
      <span>
        Whether or not the client has successfully subscribed to the channel.
      </span>
    ),
    args: [],
  },
  {
    name: "bind",
    signature: "bind<TData>;(event: string, handler: EventBindHandler<TData>",
    description: () => <span>Binds to an event on the channel.</span>,
    args: [
      { name: "event", description: "The name of the event to bind to." },
      {
        name: "handler",
        description: "The function to run when the event is triggered.",
      },
      { name: "options?", description: "Additional options for the binding." },
    ],
  },
  {
    name: "bindGlobal",
    signature: "bindGlobal<TData>(handler: ChannelGlobalHandler<TData>): void",
    description: () => <span>Binds to all events on the channel.</span>,
    args: [
      {
        name: "handler",
        description: "The function to run when any event is triggered.",
      },
    ],
  },
  {
    name: "unbind",
    signature: "unbind(...events: string[]): void",
    description: () => <span>Unbinds from events on the channel.</span>,
    args: [
      {
        name: "...events",
        description: "The events names to unbind from.",
      },
    ],
  },
  {
    name: "unbindGlobal",
    signature: "unbindGlobal(): void",
    description: () => <span>Removes global bindings for this channel.</span>,
    args: [],
  },
  {
    name: "unsubscribe",
    signature: "unsubscribe(): void",
    description: () => <span>Unsubscribes from the channel.</span>,
    args: [],
  },
  {
    name: "trigger",
    signature:
      "trigger(eventName: string, data: Record<string, unknown>): void",
    description: () => (
      <span>
        Triggers a{" "}
        <a href="/docs/01-getting-started/01-what-is-Fungi#client-events">
          client event
        </a>{" "}
        on the channel.
      </span>
    ),
    args: [
      {
        name: "eventName",
        description: "The name of the event. Must be prefixed with client-.",
      },
      {
        name: "data",
        description: "The data payload to be distributed with the event.",
      },
    ],
  },
  {
    name: "getEventHandlers",
    signature: "getEventHandlers(event: string): ChannelEventHandler[]",
    description: () => (
      <span>Gets the event handlers for a bound event. For internal use.</span>
    ),
    args: [
      {
        name: "event",
        description: "The name of the bound event to get the handlers of.",
      },
    ],
  },
  {
    name: "getGlobalHandlers",
    signature: "getGlobalHandlers(): ChannelGlobalHandler<any>[]",
    description: () => <span>Gets the global handlers. For internal use.</span>,
    args: [],
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
                    Property
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 divide-solid">
                {api.map((property) => (
                  <tr key={property.name} className="bg-white">
                    <td className="flex flex-col items-start space-y-6 px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex flex-col space-y-3 items-start">
                        <span className="font-bold">{property.name}</span>
                        <code>{property.signature}</code>
                      </div>

                      <div className="flex flex-col space-y-3 items-start">
                        <property.description />

                        <ul>
                          {property.args.map((arg) => (
                            <li key={arg.name}>
                              <span className="font-medium">{arg.name}</span>:{" "}
                              {arg.description}
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
