import axios from 'axios';

export default class Fetch {
  static get(axiosRequestConfig) {
    return axios(axiosRequestConfig)
      .then(req => req.data);
  }
}