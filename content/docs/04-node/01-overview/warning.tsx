import React from "react";
import { ExclamationIcon } from "@heroicons/react/solid";

export function Warning() {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationIcon
            className="h-5 w-5 text-yellow-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <p style={{ margin: 0 }} className="text-sm text-yellow-700">
            Make sure the endpoint follows the format in the example,{" "}
            <code>http://localhost:8080</code> is a valid endpoint but{" "}
            <code>http://localhost:8080/</code> is <strong>NOT</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
