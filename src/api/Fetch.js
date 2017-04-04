import axios from 'axios';

export default class Fetch {
  static get(axiosRequestConfig) {
    return axios(axiosRequestConfig)
      .then(x => { console.log(x); return x; })
      .then(req => req.data.data);
  }
}