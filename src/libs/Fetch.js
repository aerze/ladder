import axios from 'axios';

export default class Fetch {
  static selectData(axiosReq) {
    return axiosReq.data.data;
  }

  constructor(path = '', debug = false) {
    this.baseUrl = 'http://ladder.mythril.co:9001/api/';
    this.path = path;
    this.debug = debug;

    this.log = this.log.bind(this);
  }

  log(axiosReq) {
    if (this.debug) console.log(`Fetch:: ${axiosReq.config.method} response`, axiosReq);
    return axiosReq;
  }

  getUrl() {
    return `${this.baseUrl}${this.path}`;
  }

  axios(config = {}) {
    if (this.debug) console.log(`Fetch:: ${config.method} request`, config);

    return axios(config)
    .then(this.log)
    .then(Fetch.selectData);
  }

  get(config = {}) {
    return this.axios({
      ...config,
      url: this.getUrl(),
      method: 'GET'
    });
  }
}
