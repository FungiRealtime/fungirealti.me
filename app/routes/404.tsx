import { MetaFunction } from "remix";

export let meta: MetaFunction = () => {
  return {
    title: "Page not found",
    description:
      "Fungi empowers developers to add realtime features to their apps with easy to use and scalable APIs.",
  };
};

export default function FourOhFour() {
  return (
    <section className="bg-gray-50 overflow-hidden min-h-screen flex items-center">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <a href="/">
            <img
              className="mx-auto h-64"
              src="/images/logo_transparent_letters.png"
              alt="Logo"
            />
          </a>
          <blockquote>
            <div className="max-w-2xl mx-auto text-center text-2xl leading-9 font-medium text-gray-900">
              <p>
                We looked everywhere but couldn't find the page you were looking
                for.
              </p>
            </div>
            <footer className="mt-8"></footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
