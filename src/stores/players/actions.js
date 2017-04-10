import * as types from './actionTypes';
import playerApi from './api';

export function getPlayers() {
  return {
    type: types.GET_PLAYERS,
    payload: playerApi.get()
  };
}

export function createPlayer(player) {
  return {
    type: types.CREATE_PLAYER,
    meta: player,
    payload: 'new player'
  };
}
