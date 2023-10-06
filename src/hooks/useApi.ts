import { getApi } from "@/lib/getApi";
import { ApiPromise } from "@polkadot/api";
import { useEffect, useRef, useState } from "react";

export const useApi = (provider: string) => {
  const [api, setApi] = useState<ApiPromise>();
  const flag = useRef(true);
  useEffect(() => {
    (async () => {
      let { api: finalApi, wsProvider } = await getApi(provider);

      // The first connection is closed here because of React 18's strict mode update,
      // which triggers the component to mount, unmount, and remount, resulting in
      // the double connection.
      if (flag.current) {
        flag.current = false;
        return wsProvider.disconnect();
      }
      setApi(finalApi);
    })();
  }, []);

  return api;
};
