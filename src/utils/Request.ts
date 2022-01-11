import ErrorHandler from './ErrorHandler';
import axios from 'axios';
import { Config } from '~/common';

const Request = {
  get: async (url: string, params: any = {}) => {
    let data = {} as any;
    await axios.get(Config.SERVER_URL + url, { params })
      .then((response: any) => {
        data = response.data;
      })
      .catch((error: any) => {
        ErrorHandler.Api(error, "[Get Request Error]", url);
      })
    return data;
  },
  post: async (url: string, body: any = {}) => {
    let data = {} as any;
    await axios.post(Config.SERVER_URL + url, body)
      .then((response: any) => {
        data = response.data;
      })
      .catch((error: any) => {
        ErrorHandler.Api(error, "[Post Request Error]", url);
      })
    return data;
  },
  login: async (url: string, body: any = {}) => {
    let token = "";
    await axios.post(Config.SERVER_URL + url, body)
      .then((response: any) => {
        token = response.data['token'] ?? "";
      })
      .catch((error: any) => {
        ErrorHandler.Api(error, "[Login Request Error]", url);
      })
    return token;
  }
};

export default Request;