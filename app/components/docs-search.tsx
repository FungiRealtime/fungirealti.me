import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { SearchIcon } from "@heroicons/react/solid";
import { DocumentIcon, HashtagIcon } from "@heroicons/react/outline";
import { Dialog, Transition } from "@headlessui/react";
import debounce from "lodash.debounce";
import { usePublicEnv } from "../hooks/use-public-env";
import { docsSearchParams, searchClient } from "../utils/algolia.client";
import { DocsSearchResult } from "../types";
import { classNames } from "../utils/classNames";

let ACTION_KEY_DEFAULT = ["Ctrl ", "Control"];
let ACTION_KEY_APPLE = ["⌘", "Command"];
let SHORTCUT_KEY = "k";
let GENERIC_ERROR_MESSAGE = "Oops! Something went wrong with your search :(";

interface Hit {
  lvl0: {
    value: string;
    highlighted: string;
  };
  lvl1: {
    value: string;
    highlighted: string;
  } | null;
  url: string;
}

interface SearchState {
  hits: Hit[];
  status: "idle" | "loading" | "success" | "error";
  errorMessage: string | null;
}

let initialSearchState: SearchState = {
  hits: [],
  status: "idle",
  errorMessage: null,
};

export function DocsSearch() {
  let searchButtonRef = useRef<HTMLButtonElement>(null);
  let [isOpen, setIsOpen] = useState(false);
  let [browserDetected, setBrowserDetected] = useState(false);
  let [actionKey, setActionKey] = useState(ACTION_KEY_DEFAULT);
  let { PUBLIC_ALGOLIA_INDEX } = usePublicEnv();
  let [searchState, setSearchState] = useState<SearchState>(initialSearchState);

  let onOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  let onClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  let search = async (query: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      status: "loading",
      errorMessage: null,
    }));

    try {
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
          lvl0: {
            highlighted: hit._highlightResult.hierarchy.lvl0.value,
            value: hit.hierarchy.lvl0,
          },
          lvl1:
            hit.hierarchy.lvl1 && hit._highlightResult.hierarchy.lvl1
              ? {
                  highlighted: hit._highlightResult.hierarchy.lvl1.value,
                  value: hit.hierarchy.lvl1,
                }
              : null,
          url: hit.url,
        };
      });

      setSearchState(() => ({
        hits: pageHits,
        status: "success",
        errorMessage: null,
      }));
    } catch (error) {
      setSearchState(() => ({
        hits: [],
        status: "error",
        errorMessage: error.message,
      }));
    }
  };

  let onInput = debounce<(query: string) => void>((query) => {
    search(query);
  }, 400);

  let onKeyDown = (event: KeyboardEvent) => {
    let keyPressed = event.key.toLowerCase();
    if (keyPressed === SHORTCUT_KEY && event.ctrlKey) {
      event.preventDefault();
      onOpen();
    }
  };

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

  useEffect(() => {
    if (actionKey) {
      document.addEventListener("keydown", onKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [actionKey]);

  useEffect(() => {
    if (!isOpen) {
      setSearchState(initialSearchState);
    }
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        ref={searchButtonRef}
        disabled={!browserDetected}
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
                    {searchState.status === "loading" ? (
                      <>
                        <svg
                          className="animate-spin h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </>
                    ) : (
                      <SearchIcon className="h-6 w-6" aria-hidden="true" />
                    )}
                  </div>
                </div>

                <div
                  className={classNames(
                    "max-h-96 overflow-y-auto",
                    searchState.status === "success" ||
                      searchState.status === "error"
                      ? "border-t border-gray-200"
                      : ""
                  )}
                >
                  {searchState.status === "error" && (
                    <strong className="block p-5">
                      {searchState.errorMessage ?? GENERIC_ERROR_MESSAGE}
                    </strong>
                  )}

                  {searchState.status === "success" && (
                    <ul>
                      {searchState.hits.map((hit) => (
                        <li key={hit.url}>
                          <a
                            href={hit.url}
                            className="px-5 py-4 flex items-center group focus:bg-gray-50 hover:bg-gray-50 focus:outline-none"
                          >
                            {hit.lvl1 ? (
                              <>
                                <HashtagIcon className="h-4 w-4 mr-4 text-gray-500 group-focus:text-brand group-hover:text-brand" />
                                <span
                                  className="mr-4 text-gray-900 group-focus:text-brand group-hover:text-brand"
                                  dangerouslySetInnerHTML={{
                                    __html: hit.lvl1.highlighted,
                                  }}
                                />
                                <span
                                  className="ml-auto text-right text-gray-500"
                                  dangerouslySetInnerHTML={{
                                    __html: hit.lvl0.highlighted,
                                  }}
                                />
                              </>
                            ) : (
                              <>
                                <DocumentIcon className="h-4 w-4 mr-4 text-gray-500 group-focus:text-brand group-hover:text-brand" />
                                <span
                                  className="text-gray-900 group-focus:text-brand group-hover:text-brand"
                                  dangerouslySetInnerHTML={{
                                    __html: hit.lvl0.highlighted,
                                  }}
                                />
                              </>
                            )}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="border-t border-gray-200 p-5 flex items-center justify-end space-x-2">
                  <span className="text-sm text-gray-600">Search by</span>{" "}
                  <a href="https://www.algolia.com/">
                    <img
                      src="/images/algolia.svg"
                      alt="Algolia"
                      className="h-auto w-[4.5rem]"
                    />
                  </a>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
