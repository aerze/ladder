import Fetch from '../../libs/Fetch';

const playerApi = new Fetch('players');

export default playerApi;

export function getPlayers() {
  return playerApi.get();
}
