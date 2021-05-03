import { redirect } from "remix";
import { LoaderFunction } from "remix";
import { destroySession, getSession } from "../../utils/sessions";

export let loader: LoaderFunction = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie"));
  let url = new URL(request.url);
  let params = new URLSearchParams(url.search);
  let nextPath = params.get("next") ?? "/";

  return redirect(nextPath, {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};

export default function OAuthRedirect() {
  return null;
}
