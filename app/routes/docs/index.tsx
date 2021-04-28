export default function GettingStarted() {
  return (
    <div className="flex">
      <div className="prose text-gray-500 flex-1 pt-8 pb-12">
        <h1>Getting started with Fungi</h1>
        <p>
          Before we get started you'll need a license to follow along. If you
          don't have one, you can get one{" "}
          <a className="text-brand underline" href="/pricing">
            here
          </a>
          .
        </p>

        <p>
          Once you buy a license, you'll receive an email from GitHub with an
          invitation to our organization, go ahead and accept it, this will
          allow you to use our product and get support from the community. If
          you haven't received an invitation, go ahead and{" "}
          <a className="text-brand underline" href="/support">
            submit a request to our support.
          </a>
        </p>

        <h2 id="prerequisites" className="group">
          <a className="group-hover:text-gray-700 block" href="#prerequisites">
            Prerequisites
          </a>
        </h2>
        <ul>
          <li>
            Docker, get it{" "}
            <a className="text-brand underline" href="https://www.docker.com/">
              here
            </a>
            .
          </li>
        </ul>
        <h2 id="overview" className="group">
          <a className="group-hover:text-gray-700 block" href="#overview">
            Overview
          </a>
        </h2>
        <p>
          Fungi is a <strong>self-hosted</strong> solution, that's the reason
          Docker is a prerequisite, this way you can run Fungi anywhere Docker
          is supported.
        </p>
        <p>
          There are 2 core components (each a docker image) that you need to
          run:
        </p>
        <ul>
          <li>
            <strong>WebSockets server</strong>. This is what your client app
            will use to open a persistent bi-directional communication channel
            between Fungi and your app.
          </li>
          <li>
            <strong>REST API</strong>. Your app's server code will communicate
            with this API to send realtime data to the WebSockets server so that
            the client app can receive it.
          </li>
        </ul>
        <p>
          If you would like to know more about this from a technical point of
          view, you can check out the{" "}
          <a
            className="text-brand underline"
            href="/docs/api-reference/server-specification"
          >
            server specification
          </a>
          .
        </p>

        <h2 id="next-steps" className="group">
          <a className="group-hover:text-gray-700 block" href="#next-steps">
            Next steps
          </a>
        </h2>

        <p>
          Now that you understand the prerequisites and the basic setup
          explained in the{" "}
          <a className="text-brand underline" href="#overview">
            overview
          </a>{" "}
          you can continue with the{" "}
          <a
            className="text-brand underline"
            href="/docs/getting-started/installation"
          >
            installation
          </a>
          .
        </p>
      </div>

      <nav className="hidden xl:block pl-12 w-64 pt-10 overflow-y-auto max-h-[84vh] sticky top-16">
        <h5 className="text-gray-900 uppercase tracking-wide font-semibold mb-3 text-sm lg:text-xs">
          On this page
        </h5>
        <ul className="overflow-x-hidden text-gray-500 font-medium text-sm">
          <li>
            <a
              href="#prerequisites"
              className="block transform transition-colors duration-200 py-2 hover:text-gray-900"
            >
              Prerequisites
            </a>
          </li>
          <li>
            <a
              href="#overview"
              className="block transform transition-colors duration-200 py-2 hover:text-gray-900"
            >
              Overview
            </a>
          </li>
          <li>
            <a
              href="#next-steps"
              className="block transform transition-colors duration-200 py-2 hover:text-gray-900"
            >
              Next steps
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
