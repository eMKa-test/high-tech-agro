import {useEffect, useState} from "react";
import {postData} from "../api/request";

async function post(url, req, callback) {
  let res = null;
  try {
    res = await postData(url, req);
  } finally {
    callback(res);
  }
}

function useAsyncPost(url, req) {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    void post(url, req, (res) => {
      if (isMounted) {
        setResponse(res);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [url]);

  return [loading, response];
}

export default useAsyncPost;
