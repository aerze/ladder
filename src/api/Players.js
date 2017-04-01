import Fetch from './Fetch'

export default class Players extends Fetch{
  static getPlayers() {
    return this.get({
      method: 'GET',
      url: "http://ladder.mythril.co:9001/api/players",
    });
  }
}