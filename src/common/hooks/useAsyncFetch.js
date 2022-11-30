import {useEffect, useState} from "react";
import {getData} from "../api/request";

async function getContent(url, req, callback) {
  let res = null;
  try {
    res = await getData(url, req);
  } finally {
    callback(res);
  }
}

function useAsyncFetch(url, params) {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    // eslint-disable-next-line no-void
    void getContent(url, {params}, (res) => {
      if (isMounted) {
        setContent(res);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [url, JSON.stringify(params)]);

  return [loading, content];
}

export default useAsyncFetch;
