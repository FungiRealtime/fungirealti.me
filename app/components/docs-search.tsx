import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { DocSearchModal, useDocSearchKeyboardEvents } from "@docsearch/react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { usePublicEnv } from "../hooks/use-public-env";
import { SearchIcon } from "@heroicons/react/solid";

let ACTION_KEY_DEFAULT = ["Ctrl ", "Control"];
let ACTION_KEY_APPLE = ["⌘", "Command"];

interface Hit {
  url: string;
}

interface HitProps {
  hit: Hit;
  children: ReactNode;
}

function Hit({ hit, children }: HitProps) {
  return <a href={hit.url}>{children}</a>;
}

export function DocsSearch() {
  let navigate = useNavigate();
  let [isOpen, setIsOpen] = useState(false);
  let searchButtonRef = useRef<HTMLButtonElement>(null);
  let [initialQuery, setInitialQuery] = useState<string>();
  let [browserDetected, setBrowserDetected] = useState(false);
  let [actionKey, setActionKey] = useState(ACTION_KEY_DEFAULT);
  let {
    PUBLIC_ALGOLIA_API_KEY,
    PUBLIC_ALGOLIA_APP_ID,
    PUBLIC_ALGOLIA_INDEX,
  } = usePublicEnv();

  let onOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  let onClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  let onInput = useCallback(
    (e) => {
      setIsOpen(true);
      setInitialQuery(e.key);
    },
    [setIsOpen, setInitialQuery]
  );

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen,
    onClose,
    onInput,
    searchButtonRef,
  });

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
            <abbr title={actionKey[1]} className="no-underline">
              {actionKey[0]}
            </abbr>
          </kbd>
          <span className="sr-only"> and </span>
          <kbd className="font-sans">K</kbd>
          <span className="sr-only"> to search</span>
        </span>
      </button>
      {isOpen &&
        createPortal(
          <DocSearchModal
            initialQuery={initialQuery}
            initialScrollY={window.scrollY}
            onClose={onClose}
            indexName={PUBLIC_ALGOLIA_INDEX}
            apiKey={PUBLIC_ALGOLIA_API_KEY}
            appId={PUBLIC_ALGOLIA_APP_ID}
            // @ts-ignore
            navigator={{
              navigate({ suggestionUrl }) {
                setIsOpen(false);
                navigate(suggestionUrl);
              },
            }}
            hitComponent={Hit}
          />,
          document.body
        )}
    </>
  );
}
