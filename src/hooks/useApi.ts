import { useEffect, useRef, useState } from "react";
import { ApiPromise } from "@polkadot/api";
import { getApi } from "@/lib/getApi";

export const useApi = (provider: string) => {
  const [api, setApi] = useState<ApiPromise>();
  const flag = useRef(false);
  useEffect(() => {
    (async () => {
      let { api: finalApi, wsProvider } = await getApi(provider);

      // The first connection is closed here because of React 18's strict mode update,
      // which triggers the component to mount, unmount, and remount, resulting in
      // the double connection.
      if (flag.current) {
        return wsProvider.disconnect();
      }
      setApi(finalApi);
      flag.current = true;
    })();
  }, []);

  return api;
};
