import { combineReducers } from 'redux';
import players, { playerSelectors as fromPlayerSelectors } from './players';

export const selectorWrapper = namespace =>
  selector =>
    (state, ...args) =>
      selector(state[namespace], ...args);

export const wrapSelectors = (namespace, selectors) => {
  const namespaceWrapper = selectorWrapper(namespace);
  return Object.keys(selectors).reduce((wrappedSelector, name) => {
    wrappedSelector[name] = namespaceWrapper(selectors[name]);
    return wrappedSelector;
  }, {});
};

export default combineReducers({
  players,
});

const playerSelectors = wrapSelectors('players', fromPlayerSelectors);

export {
  playerSelectors
};

// const getTopPlayers = (state, top) => {
//   fromPlayerSelectors.getTopPlayers(state.players, top);
// };

// const getAllPlayers = (state, top) => {
//   fromPlayerSelectors.getAllPlayers(state.players, top);
// };

// const playerSelectors = {
//   getTopPlayers,
//   getAllPlayers
// };

// const playerWrapper = selectorWrapper('players');
// const playerSelectors = {
//   getTopPlayers: playerWrapper(fromPlayerSelectors.getTopPlayers),
//   getAllPlayers: playerWrapper(fromPlayerSelectors.getAllPlayers),
// };
