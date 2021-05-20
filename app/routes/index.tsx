import { HeadersFunction, MetaFunction } from "remix";
import { ChatIcon, LocationMarkerIcon } from "@heroicons/react/outline";
import { BellIcon, ChartBarIcon, GlobeIcon } from "@heroicons/react/solid";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { generateMeta } from "../utils/seo";

export let meta: MetaFunction = ({ location }) => {
  return generateMeta({
    pathname: location.pathname,
    title: "Fungi | Powering realtime experiences",
    description:
      "Fungi empowers developers to add realtime features to their apps with easy to use and scalable APIs.",
  });
};

let features = [
  {
    name: "In app chats",
    icon: ChatIcon,
    description: "Bring your users an amazing conversational experience.",
  },
  {
    name: "WebRTC apps",
    icon: GlobeIcon,
    description:
      "Reliable video calls, voice calls and more with WebRTC and Fungi as your signaling service.",
  },
  {
    name: "Notifications",
    icon: BellIcon,
    description:
      "Keep your users in the loop with instant notifications delivered every time.",
  },
  {
    name: "Multiplayer games",
    icon: (props: any) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        {...props}
      >
        <path d="M17.622 3c-1.913 0-2.558 1.382-5.623 1.382-3.009 0-3.746-1.382-5.623-1.382-5.209 0-6.376 10.375-6.376 14.348 0 2.145.817 3.652 2.469 3.652 3.458 0 2.926-5 6.915-5h5.23c3.989 0 3.457 5 6.915 5 1.652 0 2.471-1.506 2.471-3.651 0-3.973-1.169-14.349-6.378-14.349zm-10.622 10c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zm10-6c.552 0 1 .447 1 1 0 .553-.448 1-1 1s-1-.447-1-1c0-.553.448-1 1-1zm-2 4c-.552 0-1-.447-1-1 0-.553.448-1 1-1s1 .447 1 1c0 .553-.448 1-1 1zm2 2c-.552 0-1-.447-1-1 0-.553.448-1 1-1s1 .447 1 1c0 .553-.448 1-1 1zm2-2c-.552 0-1-.447-1-1 0-.553.448-1 1-1s1 .447 1 1c0 .553-.448 1-1 1zm-10.25-1c0 .965-.785 1.75-1.75 1.75s-1.75-.785-1.75-1.75.785-1.75 1.75-1.75 1.75.785 1.75 1.75z" />
      </svg>
    ),
    description:
      "Deliver delightful experiences to gamers with responsive APIs.",
  },
  {
    name: "Location tracking",
    icon: LocationMarkerIcon,
    description:
      "Track deliveries, order status, GPS locations and more with realtime updates.",
  },
  {
    name: "Realtime charts",
    icon: ChartBarIcon,
    description:
      "From cryptocurrency charts to admin dashboards, always show fresh data.",
  },
];

export let headers: HeadersFunction = () => {
  return {
    "Cache-Control":
      "public, max-age=7200, s-maxage=86400, stale-while-revalidate=2592000",
  };
};

export default function Index() {
  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden">
        <Header />

        <main>
          <div className="pt-10 bg-gray-900 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
            <div className="mx-auto max-w-7xl lg:px-8">
              <div className="lg:grid lg:grid-cols-2 lg:gap-20">
                <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                  <div className="lg:py-24">
                    <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                      <span className="block">A better way to</span>
                      <span className="block text-brand">
                        build realtime apps
                      </span>
                    </h1>
                    <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                      Stateless, scalable and easy to use realtime APIs and
                      SDKs. We take care of all the complexity so you can focus
                      on building your app.
                    </p>
                  </div>
                </div>
                <div className="mt-12 -mb-16 lg:mb-0 lg:mt-12 lg:relative flex items-center">
                  <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                    <img
                      className="w-full lg:max-w-none"
                      src="/images/hero.svg"
                      alt="Collaboration"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Features */}
          <div className="relative bg-white py-16 sm:py-24 lg:py-32">
            <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
              <h2 className="text-base font-semibold tracking-wider text-brand uppercase">
                Use cases
              </h2>
              <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                What can you build with Fungi?
              </p>
              <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
                You can build just about any realtime feature you can think of.
                Here are some common use cases.
              </p>
              <div className="mt-12">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {features.map((feature) => (
                    <div key={feature.name} className="pt-6">
                      <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                        <div className="-mt-6">
                          <div>
                            <span className="inline-flex items-center justify-center p-3 bg-brand rounded-md shadow-lg">
                              <feature.icon
                                className="h-6 w-6 text-white"
                                aria-hidden="true"
                              />
                            </span>
                          </div>
                          <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                            {feature.name}
                          </h3>
                          <p className="mt-5 text-base text-gray-500">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-red-50">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-24 lg:px-8 lg:flex lg:items-center lg:justify-between">
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
                <span className="block">Ready to dive in?</span>
                <span className="block text-brand">Get started today.</span>
              </h2>
              <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                <div className="inline-flex rounded-md shadow">
                  <a
                    href="/docs"
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand hover:bg-red-500"
                  >
                    Get started
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
