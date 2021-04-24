import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useMatches, useRouteData } from "@remix-run/react";
import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { DataWithUser } from "../types";
import { classNames } from "../utils/classNames";
import { isSamePathname } from "../utils/routes";

let navigation = [{ label: "Account", href: "/dashboard" }];

let profileLinks = [
  { label: "Your Account", href: "/dashboard" },
  { label: "Sign out", href: "/oauth/sign-out" },
];

export function DashboardHeader() {
  let { user } = useRouteData<DataWithUser>();
  let matches = useMatches();
  let location = useLocation();
  let routeLabel = matches.find((match) => match.handle?.label)?.handle.label;

  return (
    <div className="bg-gray-900 pb-32">
      <Disclosure as="nav" className="bg-gray-900">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="border-b border-gray-700">
                <div className="flex items-center justify-between h-16 px-4 sm:px-0">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8"
                        src="/logo_transparent.png"
                        alt="Logo"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((link) =>
                          isSamePathname(location.pathname, link.href) ? (
                            <Link
                              key={link.href}
                              to={link.href}
                              className="bg-gray-800 text-white px-3 py-2 rounded-md text-sm font-medium"
                            >
                              {link.label}
                            </Link>
                          ) : (
                            <Link
                              key={link.href}
                              to={link.href}
                              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            >
                              {link.label}
                            </Link>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* Profile dropdown */}
                      <Menu as="div" className="ml-3 relative">
                        {({ open }) => (
                          <>
                            <div>
                              <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                <span className="sr-only">Open user menu</span>
                                <img
                                  className="h-8 w-8 rounded-full"
                                  src={user.avatarURL}
                                  alt="Avatar"
                                />
                              </Menu.Button>
                            </div>
                            <Transition
                              show={open}
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items
                                static
                                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                              >
                                {profileLinks.map((link) => (
                                  <Menu.Item key={link.href}>
                                    {({ active }) => (
                                      <Link
                                        to={link.href}
                                        className={classNames(
                                          active ? "bg-gray-100" : "",
                                          "block px-4 py-2 text-sm text-gray-700"
                                        )}
                                      >
                                        {link.label}
                                      </Link>
                                    )}
                                  </Menu.Item>
                                ))}
                              </Menu.Items>
                            </Transition>
                          </>
                        )}
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="border-b border-gray-700 md:hidden">
              <div className="px-2 py-3 space-y-1 sm:px-3">
                {navigation.map((link) =>
                  isSamePathname(location.pathname, link.href) ? (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="bg-gray-800 text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </div>
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user.avatarURL}
                      alt="Avatar"
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">
                      {user.name}
                    </div>
                    <div className="text-sm mt-1 font-medium leading-none text-gray-400">
                      {user.username}
                    </div>
                  </div>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  {profileLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <header className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">{routeLabel}</h1>
        </div>
      </header>
    </div>
  );
}
