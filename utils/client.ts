import axios, { AxiosPromise } from "axios";
import qs from "qs";
import { Request, Response } from "@/types/api";

const BUSINESS_DOMAIN = process.env.NEXT_PUBLIC_BUSINESS_DOMAIN as string;

export default function client<T = unknown>(
  url: string,
  config?: Request
): AxiosPromise<Response<T>> {
  const formData = typeof window !== "undefined" && new FormData();
  const { req, type, token, payload, method = "GET", ...rest } = config || {};
  rest.withCredentials = true;
  rest.baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT;

  const headers = rest.headers || {};

  if (token) {
    headers["Authorization"] = token
      ? "Bearer " + token
      : `${process.env.NEXT_PUBLIC_BASIC_AUTH_TOKEN}`;
  }

  if (typeof window === "undefined") {
    headers["origin"] = BUSINESS_DOMAIN;
  }

  switch (type) {
    case "multipart":
      headers["Content-Type"] = "multipart/form-data";
      formData &&
        Object.entries(payload).forEach(([name, value]) => {
          formData.append(name, value as string | Blob);
        });
      break;
    case "csv":
      headers["Accept"] = "application/json";
      rest.responseType = "blob";
      break;

    case "form":
      headers["Content-Type"] = "application/x-www-form-urlencoded";
      break;

    default:
      headers["Content-Type"] = "application/json";
  }

  return axios({
    url,
    method,
    ...rest,
    timeout: 50000,
    headers: {
      ...headers,
      proxy_host: BUSINESS_DOMAIN,
      "domain-url": BUSINESS_DOMAIN,
    },
    [method !== "GET" ? "data" : "params"]:
      type === "form"
        ? qs.stringify(payload)
        : type === "multipart"
        ? formData
        : payload,
  });
}
