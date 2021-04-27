import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  MenuAlt2Icon,
  UsersIcon,
  XIcon,
} from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import { classNames } from "../utils/classNames";
import { json, LoaderFunction } from "@remix-run/node";
import { GithubFileOrDir } from "../github.server";
import { octokit } from "../octokit.server";

const navigation = [
  { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
  { name: "Team", href: "#", icon: UsersIcon, current: false },
  { name: "Projects", href: "#", icon: FolderIcon, current: false },
  { name: "Calendar", href: "#", icon: CalendarIcon, current: false },
  { name: "Documents", href: "#", icon: InboxIcon, current: false },
  { name: "Reports", href: "#", icon: ChartBarIcon, current: false },
  { name: "Reports", href: "#", icon: ChartBarIcon, current: false },
  { name: "Reports", href: "#", icon: ChartBarIcon, current: false },
  { name: "Reports", href: "#", icon: ChartBarIcon, current: false },
  { name: "Reports", href: "#", icon: ChartBarIcon, current: false },
  { name: "Reports", href: "#", icon: ChartBarIcon, current: false },
  { name: "Reports", href: "#", icon: ChartBarIcon, current: false },
  { name: "Reports", href: "#", icon: ChartBarIcon, current: false },
  { name: "Reports", href: "#", icon: ChartBarIcon, current: false },
  { name: "Reports", href: "#", icon: ChartBarIcon, current: false },
  { name: "Reports", href: "#", icon: ChartBarIcon, current: false },
  { name: "Reports", href: "#", icon: ChartBarIcon, current: false },
  { name: "Reports", href: "#", icon: ChartBarIcon, current: false },
  { name: "Reports", href: "#", icon: ChartBarIcon, current: false },
  { name: "Reports", href: "#", icon: ChartBarIcon, current: false },
  { name: "Reports", href: "#", icon: ChartBarIcon, current: false },
  { name: "Reports", href: "#", icon: ChartBarIcon, current: false },
  { name: "Reports", href: "#", icon: ChartBarIcon, current: false },
  { name: "Reports", href: "#", icon: ChartBarIcon, current: false },
  { name: "Reports", href: "#", icon: ChartBarIcon, current: false },
  { name: "Reports", href: "#", icon: ChartBarIcon, current: false },
  { name: "Reports", href: "#", icon: ChartBarIcon, current: false },
  { name: "Reports", href: "#", icon: ChartBarIcon, current: false },
  { name: "Reports", href: "#", icon: ChartBarIcon, current: false },
  { name: "Reports", href: "#", icon: ChartBarIcon, current: false },
  { name: "Reports", href: "#", icon: ChartBarIcon, current: false },
  { name: "Reports", href: "#", icon: ChartBarIcon, current: false },
];

export let loader: LoaderFunction = async () => {
  let { data: filesOrDirs } = await octokit.request(
    "GET /repos/{owner}/{repo}/contents/{path}",
    {
      owner: "FungiRealtime",
      repo: "fungirealti.me",
      path: "content",
    }
  );

  let docsTreeSha = (filesOrDirs as GithubFileOrDir[]).find(
    (fileOrDir) => fileOrDir.name === "docs"
  )?.sha;
  if (!docsTreeSha) {
    return json({ error: "" }, { status: 500 });
  }

  let { data } = await octokit.request(
    "GET /repos/{owner}/{repo}/git/trees/{tree_sha}?recursive=1",
    {
      owner: "FungiRealtime",
      repo: "fungirealti.me",
      tree_sha: docsTreeSha,
    }
  );

  console.log(data.tree);

  return json(null);
};

export default function Docs() {
  let [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="lg:max-w-[88rem] w-full mx-auto h-screen bg-white overflow-hidden flex">
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
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                  alt="Workflow"
                />
              </div>
              <div className="mt-5 flex-1 h-0 overflow-y-auto">
                <nav className="px-2 space-y-1">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                        "group rounded-md py-2 px-2 flex items-center text-base font-medium"
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.current
                            ? "text-gray-500"
                            : "text-gray-400 group-hover:text-gray-500",
                          "mr-4 h-6 w-6"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ))}
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
      <div className="hidden lg:flex lg:flex-shrink-0 lg:mr-8">
        <div className="w-64 flex flex-col pt-5">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="pb-4 flex flex-col flex-grow overflow-y-auto">
            <div className="flex-grow flex flex-col">
              <nav className="flex-1 bg-white pl-2 pr-4 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                      "group rounded-md py-2 px-2 flex items-center text-sm font-medium"
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? "text-gray-500"
                          : "text-gray-400 group-hover:text-gray-500",
                        "mr-3 h-6 w-6"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col mt-1 lg:pl-0 lg:pr-8">
        <div className="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 flex">
          <button
            className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 flex justify-between px-4 lg:px-0">
            <div className="flex items-center mr-6">
              <img
                className="h-8 w-auto"
                src="/logo_transparent.png"
                alt="Workflow"
              />
            </div>

            <div className="flex-1 flex">
              <form className="w-full flex lg:ml-0" action="#" method="GET">
                <label htmlFor="search_field" className="sr-only">
                  Search
                </label>
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                    <SearchIcon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <input
                    id="search_field"
                    className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                    placeholder="Search"
                    type="search"
                    name="search"
                  />
                </div>
              </form>
            </div>
            <div className="ml-4 flex items-center lg:ml-6">
              <a
                href="https://github.com/FungiRealtime"
                className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
            </div>
          </div>
        </div>

        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="px-4 sm:px-6 lg:px-0">
              <h1 className="text-2xl font-semibold text-gray-900">Docs</h1>
            </div>
            <div className="px-4 sm:px-6 lg:px-0">
              {/* Replace with your content */}
              <div className="py-4">
                <div className="h-96 border-4 border-dashed border-gray-200 rounded-lg" />
              </div>
              {/* /End replace */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
