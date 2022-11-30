import {axiosWrapped, createOptions} from "./helpers";

export function getData(url, req) {
  const options = createOptions(url, req);

  return axiosWrapped(url, options);
}

export function postData(url, req) {
  const options = createOptions(url, req);

  if (req.onUploadProgress) {
    options.onUploadProgress = req.onUploadProgress;
  }

  if (!options.method) {
    options.method = "POST";
  }

  return axiosWrapped.request({
    url,
    data: req.body,
    ...options,
  });
}

export function deleteData(url, req) {
  const options = createOptions(url, req);
  if (!options.method) {
    options.method = "DELETE";
  }
  return axiosWrapped(url, options);
}
