export default function GettingStarted() {
  return (
    <>
      <h1 className="text-2xl leading-6 font-bold text-gray-900">
        Getting started with Fungi
      </h1>

      <div className="prose mt-4">
        <p>Before we get started, you'll need the following:</p>
        <ul>
          <li>
            Be a member of our{" "}
            <a href="https://github.com/FungiRealtime">GitHub organization</a>,
            when you <a href="/pricing">buy a license</a>, an invitation is sent
            to your email.
          </li>
          <li>
            Docker installed, if you don't have it, you can get it{" "}
            <a href="https://www.docker.com/">here</a>.
          </li>
        </ul>
      </div>
    </>
  );
}
