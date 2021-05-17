import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { SearchIcon } from "@heroicons/react/solid";
import { DocumentIcon, HashtagIcon } from "@heroicons/react/outline";
import { Dialog, Transition } from "@headlessui/react";
import debounce from "lodash.debounce";
import { usePublicEnv } from "../hooks/use-public-env";
import { docsSearchParams, searchClient } from "../utils/algolia.client";
import { DocsSearchResult } from "../types";

let ACTION_KEY_DEFAULT = ["Ctrl ", "Control"];
let ACTION_KEY_APPLE = ["⌘", "Command"];

interface Hit {
  lvl0: string;
  lvl1: string | null;
  url: string;
}

export function DocsSearch() {
  let [isOpen, setIsOpen] = useState(false);
  let searchButtonRef = useRef<HTMLButtonElement>(null);
  let [browserDetected, setBrowserDetected] = useState(false);
  let [actionKey, setActionKey] = useState(ACTION_KEY_DEFAULT);
  let [hits, setHits] = useState<Hit[]>([]);
  let { PUBLIC_ALGOLIA_INDEX } = usePublicEnv();

  let onOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  let onClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  let search = async (query: string) => {
    if (!query) {
      return setHits(() => []);
    }

    let { results } = await searchClient.search([
      {
        indexName: PUBLIC_ALGOLIA_INDEX!,
        query,
        params: docsSearchParams,
      },
    ]);

    let page = results[0] as unknown as DocsSearchResult;

    let pageHits: Hit[] = page.hits.map((hit) => {
      return {
        lvl0: hit.hierarchy.lvl0,
        lvl1: hit.hierarchy.lvl1,
        url: hit.url,
      };
    });

    setHits(() => pageHits);
  };

  let onInput = debounce<(query: string) => void>((query) => {
    search(query);
  }, 400);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      if (/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) {
        setActionKey(ACTION_KEY_APPLE);
      } else {
        setActionKey(ACTION_KEY_DEFAULT);
      }
      setBrowserDetected(true);
    }
  }, []);

  return (
    <>
      <button
        type="button"
        ref={searchButtonRef}
        onClick={onOpen}
        className="group leading-6 font-medium flex items-center space-x-3 sm:space-x-4 hover:text-gray-600 transition-colors duration-200 w-full py-2"
      >
        <SearchIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
        <span className="text-gray-500">
          Quick search<span className="hidden sm:inline"> for anything</span>
        </span>
        <span
          style={{ opacity: browserDetected ? "1" : "0" }}
          className="hidden sm:block text-gray-400 leading-5 py-0.5 px-1.5 border border-gray-300 rounded-md"
        >
          <span className="sr-only">Press </span>
          <kbd className="font-sans">
            <abbr title={actionKey[1]} style={{ textDecoration: "none" }}>
              {actionKey[0]}
            </abbr>
          </kbd>
          <span className="sr-only"> and </span>
          <kbd className="font-sans">K</kbd>
          <span className="sr-only"> to search</span>
        </span>
      </button>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed z-10 inset-0 overflow-y-auto"
          open={isOpen}
          onClose={onClose}
        >
          <div className="min-h-screen pt-4 px-4 pb-20 text-center block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-top bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-28 max-w-xl w-full">
                <Dialog.Title as="span" className="sr-only">
                  Search docs
                </Dialog.Title>
                <div className="px-5 py-3 flex items-center relative w-full text-gray-400 focus-within:text-gray-600">
                  <input
                    id="docs_search"
                    name="docs_search"
                    className="block w-full pl-0 h-full pr-10 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent"
                    placeholder="Search docs"
                    type="text"
                    onInput={(event) => onInput(event.currentTarget.value)}
                  />
                  <div
                    className="absolute inset-y-0 right-5 flex items-center pointer-events-none"
                    aria-hidden="true"
                  >
                    <SearchIcon className="h-6 w-6" aria-hidden="true" />
                  </div>
                </div>

                <div className="border-t border-gray-200 max-h-96 overflow-y-scroll">
                  <ul>
                    {hits.map((hit) => (
                      <li key={hit.url}>
                        <a
                          href={hit.url}
                          className="px-5 py-4 flex items-center group focus:bg-gray-50 hover:bg-gray-50 focus:outline-none"
                        >
                          {hit.lvl1 ? (
                            <>
                              <HashtagIcon className="h-4 w-4 mr-4 text-gray-500 group-focus:text-brand group-hover:text-brand" />
                              <span className="mr-4 text-gray-900 group-focus:text-brand group-hover:text-brand">
                                {hit.lvl1}
                              </span>
                              <span className="ml-auto text-right text-gray-500">
                                {hit.lvl0}
                              </span>
                            </>
                          ) : (
                            <>
                              <DocumentIcon className="h-4 w-4 mr-4 text-gray-500 group-focus:text-brand group-hover:text-brand" />
                              <span className="text-gray-900 group-focus:text-brand group-hover:text-brand">
                                {hit.lvl0}
                              </span>
                            </>
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
