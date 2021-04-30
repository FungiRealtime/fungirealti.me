import { DocsPageNavigation } from "../../components/DocsPageNavigation";

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

        <h2 id="next-steps" className="group">
          <a className="group-hover:text-gray-700 block" href="#next-steps">
            Next steps
          </a>
        </h2>

        <p>
          From this point onwards, the documentation assumes you've purchased a
          license, with that in mind, go ahead and continue with the{" "}
          <a
            className="text-brand underline"
            href="/docs/getting-started/installation"
          >
            installation
          </a>
          .
        </p>
      </div>

      <DocsPageNavigation
        links={[{ href: "#next-steps", text: "Next steps" }]}
      />
    </div>
  );
}
