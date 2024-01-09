import { AxiosRequestConfig } from "axios";
import { IncomingMessage } from "http";

export type Request = AxiosRequestConfig & {
  req?: IncomingMessage;
  type?: "form" | "csv" | "multipart";
  token?: string;
  payload?: any;
  invalidateUrls?: string[];
  awaitInvalidateUrls?: string[];
  statusCodeHandling?: boolean;
};

export type Response<T = { [key in string]: any }> = {
  data: T;
  code: number;
  message: string;
};

export type ResponseError = {
  code: number;
  data?: { [key in string]: any };
  message: string;
};
