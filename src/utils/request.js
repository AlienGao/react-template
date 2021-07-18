import axios from "axios";
import { message } from "antd";
import config from "@/config";
// import qs from "qs";

const TIMEOUT = 10000;

const _axios = axios.create({
  baseURL: config.url,
  timeout: TIMEOUT,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

_axios.interceptors.request.use(
  (config) => {
    // if (config.method === 'get') {
    //   config.paramsSerializer = function(params) {
    //     return qs.stringify(params, { arrayFormat: 'repeat' })
    //   }
    // } 
    if (localStorage.getItem("token")) {
      config.headers.Authorization = localStorage.getItem("token");
      _axios.defaults.headers.Authorization = localStorage.getItem("token");
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

_axios.interceptors.response.use(
  (response) => {
    if (response.status !== 200) {
      message.error("接口出错了");
      return Promise.reject(response.data);
    }
    return response.data;
  },
  (err) => {
    if (err.message === `timeout of ${TIMEOUT}ms exceeded`) {
      message.error("请求超时");
    } else if (err.toString() === 'Cancel') {
    } else {
      message.error("接口出错了");
    }
    return Promise.reject(err);
  }
);

export default _axios;
