import { useEffect, useState } from "react";

type PublicEnv = Record<string, string>;

declare let window: Window & { ENV: PublicEnv };

export function usePublicEnv() {
  let [env, setEnv] = useState<PublicEnv>({});

  useEffect(() => {
    setEnv(window.ENV);
  }, []);

  return env;
}
