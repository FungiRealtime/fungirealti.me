import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MenuAlt2Icon, XIcon } from "@heroicons/react/outline";
import { HeadersFunction, json, LoaderFunction } from "remix";
import { useRouteData } from "remix";
import { Outlet, useLocation } from "react-router-dom";
import { Section } from "../types";
import { getDocsSections } from "../utils/github.server";
import { ActiveHeadingProvider } from "../active-heading-provider";
import { OutletDataProvider } from "../outlet-data-provider";
import { DocsSearch } from "../components/docs-search";

export let loader: LoaderFunction = async () => {
  let sections = await getDocsSections();

  return json(
    {
      sections,
    },
    {
      headers: {
        "Cache-Control":
          "public, max-age=7200, s-maxage=86400, stale-while-revalidate=2592000",
      },
    }
  );
};

export let headers: HeadersFunction = ({ loaderHeaders }) => {
  return {
    "Cache-Control": loaderHeaders.get("Cache-Control")!,
  };
};

interface RouteData {
  sections: Section[];
}

export default function Docs() {
  let { sections } = useRouteData<RouteData>();
  let { pathname } = useLocation();
  let [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="lg:max-w-[88rem] mx-auto bg-white lg:flex">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 z-40 flex lg:hidden"
          open={sidebarOpen}
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative max-w-xs w-full bg-white pt-5 pb-4 flex-1 flex flex-col">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 px-4 flex items-center">
                <img
                  className="h-12 sm:h-10 w-auto"
                  src="/images/logo_transparent.png"
                  alt="Fungi"
                />
              </div>
              <div className="mt-8 flex-1 h-0">
                <nav className="px-2 space-y-1">
                  <ul className="space-y-8">
                    {sections.map((section) => (
                      <li key={section.title}>
                        <h5 className="px-3 mb-3 lg:mb-3 uppercase tracking-wide font-semibold text-sm sm:text-xs text-gray-900">
                          {section.title}
                        </h5>
                        <ul>
                          {section.subsections.map((subsection) =>
                            subsection.pathname === pathname ? (
                              <li key={subsection.pathname}>
                                <a
                                  className="px-3 py-2 text-base sm:text-sm transition-colors duration-200 relative block text-brand"
                                  href={subsection.pathname}
                                >
                                  <span className="rounded-md absolute inset-0 bg-red-50"></span>
                                  <span className="relative font-medium">
                                    {subsection.title}
                                  </span>
                                </a>
                              </li>
                            ) : (
                              <li key={subsection.pathname}>
                                <a
                                  className="px-3 py-2 text-base sm:text-sm transition-colors duration-200 relative block text-gray-500 hover:text-gray-900"
                                  href={subsection.pathname}
                                >
                                  <span className="relative font-medium">
                                    {subsection.title}
                                  </span>
                                </a>
                              </li>
                            )
                          )}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0 lg:mr-8 lg:w-64 h-screen sticky top-0 border-r border-gray-200">
        <div className="overflow-y-auto w-full">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="pb-4 pt-6 flex flex-col flex-grow">
            <div className="flex-grow flex flex-col">
              <nav className="flex-1 bg-white pl-2 pr-4 space-y-1">
                <ul className="space-y-8">
                  {sections.map((section) => (
                    <li key={section.title}>
                      <h5 className="px-3 mb-3 uppercase tracking-wide font-semibold text-xs text-gray-900">
                        {section.title}
                      </h5>
                      <ul>
                        {section.subsections.map((subsection) =>
                          subsection.pathname === pathname ? (
                            <li key={subsection.pathname}>
                              <a
                                className="px-3 py-2 text-sm transition-colors duration-200 relative block text-brand"
                                href={subsection.pathname}
                              >
                                <span className="rounded-md absolute inset-0 bg-red-50"></span>
                                <span className="relative font-medium">
                                  {subsection.title}
                                </span>
                              </a>
                            </li>
                          ) : (
                            <li key={subsection.pathname}>
                              <a
                                className="px-3 py-2 text-sm transition-colors duration-200 relative block text-gray-500 hover:text-gray-900"
                                href={subsection.pathname}
                              >
                                <span className="relative font-medium">
                                  {subsection.title}
                                </span>
                              </a>
                            </li>
                          )
                        )}
                      </ul>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:pl-0 lg:pr-8 min-w-0 flex-1">
        <div className="sticky top-0 z-10 lg:py-1 flex-shrink-0 h-16 bg-white border-b border-gray-200 flex">
          <button
            className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 flex justify-between px-4 lg:px-0">
            <div className="hidden lg:flex items-center mr-6">
              <img
                className="h-8 w-auto"
                src="/images/logo_transparent.png"
                alt="Fungi"
              />
            </div>

            <div className="flex-1 flex">
              <DocsSearch />
            </div>
            <div className="ml-4 flex items-center lg:ml-6 space-x-2">
              <a
                href="https://github.com/FungiRealtime"
                className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
              >
                <span className="sr-only">Visit GitHub</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="https://hub.docker.com/orgs/fungirt"
                className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
              >
                <span className="sr-only">Visit Docker Hub</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 48 48"
                  fill="currentColor"
                >
                  <path d="M47.527,19.847c-0.13-0.102-1.345-1.007-3.908-1.007c-0.677,0.003-1.352,0.06-2.019,0.171 c-0.496-3.354-3.219-4.93-3.345-5.003l-0.688-0.392l-0.453,0.644c-0.567,0.866-1.068,1.76-1.311,2.763 c-0.459,1.915-0.18,3.713,0.806,5.25C35.417,22.928,33.386,22.986,33,23H1.582c-0.826,0.001-1.496,0.66-1.501,1.474 c-0.037,2.733,0.353,5.553,1.306,8.119c1.089,2.818,2.71,4.894,4.818,6.164C8.567,40.184,12.405,41,16.756,41 c1.965,0.006,3.927-0.169,5.859-0.524c2.686-0.487,5.271-1.413,7.647-2.74c1.958-1.119,3.72-2.542,5.219-4.215 c2.505-2.798,3.997-5.913,5.107-8.682c0.149,0,0.298,0,0.442,0c2.743,0,4.429-1.083,5.359-1.99 c0.618-0.579,1.101-1.284,1.414-2.065L48,20.216L47.527,19.847z"></path>
                  <path d="M8,22H5c-0.552,0-1-0.448-1-1v-3c0-0.552,0.448-1,1-1h3c0.552,0,1,0.448,1,1v3 C9,21.552,8.552,22,8,22z"></path>
                  <path d="M14,22h-3c-0.552,0-1-0.448-1-1v-3c0-0.552,0.448-1,1-1h3c0.552,0,1,0.448,1,1v3 C15,21.552,14.552,22,14,22z"></path>
                  <path d="M20,22h-3c-0.552,0-1-0.448-1-1v-3c0-0.552,0.448-1,1-1h3c0.552,0,1,0.448,1,1v3 C21,21.552,20.552,22,20,22z"></path>
                  <path d="M26,22h-3c-0.552,0-1-0.448-1-1v-3c0-0.552,0.448-1,1-1h3c0.552,0,1,0.448,1,1v3 C27,21.552,26.552,22,26,22z"></path>
                  <path d="M14,16h-3c-0.552,0-1-0.448-1-1v-3c0-0.552,0.448-1,1-1h3c0.552,0,1,0.448,1,1v3 C15,15.552,14.552,16,14,16z"></path>
                  <path d="M20,16h-3c-0.552,0-1-0.448-1-1v-3c0-0.552,0.448-1,1-1h3c0.552,0,1,0.448,1,1v3 C21,15.552,20.552,16,20,16z"></path>
                  <path d="M26,16h-3c-0.552,0-1-0.448-1-1v-3c0-0.552,0.448-1,1-1h3c0.552,0,1,0.448,1,1v3 C27,15.552,26.552,16,26,16z"></path>
                  <path d="M26,10h-3c-0.552,0-1-0.448-1-1V6c0-0.552,0.448-1,1-1h3c0.552,0,1,0.448,1,1v3 C27,9.552,26.552,10,26,10z"></path>
                  <path d="M32,22h-3c-0.552,0-1-0.448-1-1v-3c0-0.552,0.448-1,1-1h3c0.552,0,1,0.448,1,1v3 C33,21.552,32.552,22,32,22z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <main className="flex-1 relative focus:outline-none px-4 lg:px-0">
          <ActiveHeadingProvider>
            <OutletDataProvider data={{ docsSections: sections }}>
              <Outlet />
            </OutletDataProvider>
          </ActiveHeadingProvider>
        </main>
      </div>
    </div>
  );
}
