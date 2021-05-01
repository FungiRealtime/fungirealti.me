import { Popover, Transition } from "@headlessui/react";
import {
  AcademicCapIcon,
  ChevronDownIcon,
  DocumentTextIcon,
  MenuIcon,
  XIcon,
} from "@heroicons/react/outline";
import { Fragment } from "react";
import { usePublicEnv } from "../hooks/use-public-env";
import { classNames } from "../utils/classNames";
import { getGithubOauthUrl } from "../utils/get-github-oauth-url";

let navigation = [
  { name: "Pricing", href: "/pricing" },
  { name: "Support", href: "/support" },
];

let developersNavigation = [
  {
    name: "Docs",
    description: "Read the docs to learn how to use our products.",
    href: "/docs",
    icon: DocumentTextIcon,
  },
  {
    name: "Tutorials",
    description:
      "Explore our tutorials to build real world apps with our products.",
    href: "/tutorials",
    icon: AcademicCapIcon,
  },
];

interface HeaderProps {
  isLoggedIn: boolean;
  githubOAuthUrl: string;
}

export function Header({ isLoggedIn, githubOAuthUrl }: HeaderProps) {
  return (
    <Popover as="header" className="relative">
      {({ open }) => (
        <>
          <div className="bg-gray-900 pt-6">
            <nav
              className="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6"
              aria-label="Global"
            >
              <div className="flex items-center flex-1">
                <div className="flex items-center justify-between w-full md:w-auto">
                  <a href="/">
                    <span className="sr-only">Fungi</span>
                    <img
                      className="h-8 w-auto sm:h-10"
                      src="/logo_transparent.png"
                      alt="Fungi logo"
                    />
                  </a>
                  <div className="-mr-2 flex items-center md:hidden">
                    <Popover.Button className="bg-gray-900 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      <MenuIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="hidden space-x-8 md:flex md:ml-10">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-base font-medium text-white hover:text-gray-300"
                    >
                      {item.name}
                    </a>
                  ))}
                  <Popover className="relative">
                    {({ open }) => (
                      <>
                        <Popover.Button
                          className={classNames(
                            open ? "text-gray-300" : "text-white",
                            "group rounded-md inline-flex items-center text-base font-medium hover:text-gray-300"
                          )}
                        >
                          <span>Developers</span>
                          <ChevronDownIcon
                            className={classNames(
                              open ? "text-gray-600" : "text-gray-400",
                              "ml-2 h-5 w-5 group-hover:text-gray-500"
                            )}
                            aria-hidden="true"
                          />
                        </Popover.Button>

                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-1"
                        >
                          <Popover.Panel
                            static
                            className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-md sm:px-0"
                          >
                            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                              <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                {developersNavigation.map((item) => (
                                  <a
                                    key={item.name}
                                    href={item.href}
                                    className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 transition ease-in-out duration-150"
                                  >
                                    <item.icon
                                      className="flex-shrink-0 h-6 w-6 text-brand"
                                      aria-hidden="true"
                                    />
                                    <div className="ml-4">
                                      <p className="text-base font-medium text-gray-900">
                                        {item.name}
                                      </p>
                                      <p className="mt-1 text-sm text-gray-500">
                                        {item.description}
                                      </p>
                                    </div>
                                  </a>
                                ))}
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                </div>
              </div>
              <div className="hidden md:flex md:items-center md:space-x-6">
                {isLoggedIn ? (
                  <Fragment>
                    <a
                      href="/dashboard"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700"
                    >
                      Dashboard
                    </a>
                  </Fragment>
                ) : (
                  <Fragment>
                    <a
                      href={githubOAuthUrl}
                      className="text-base font-medium text-white hover:text-gray-300"
                    >
                      Log in
                    </a>
                    <a
                      href={githubOAuthUrl}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700"
                    >
                      Sign up
                    </a>
                  </Fragment>
                )}
              </div>
            </nav>
          </div>

          <Transition
            show={open}
            as={Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              static
              className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top md:hidden"
            >
              <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="px-5 pt-4 flex items-center justify-between">
                  <div>
                    <img
                      className="h-8 w-auto"
                      src="/logo_transparent.png"
                      alt="Fungi logo"
                    />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand">
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="pt-5 pb-6">
                  <div className="px-2 space-y-1">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className="mt-6 px-5">
                    <a
                      href={githubOAuthUrl}
                      className="block text-center w-full py-3 px-4 rounded-md shadow bg-brand text-white font-medium hover:bg-red-500"
                    >
                      Sign up
                    </a>
                  </div>
                  <div className="mt-6 px-5">
                    <p className="text-center text-base font-medium text-gray-500">
                      Existing customer?{" "}
                      <a
                        href={githubOAuthUrl}
                        className="text-gray-900 hover:underline"
                      >
                        Log in
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
