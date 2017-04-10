import * as types from './actionTypes';

const initialState = {
  players: [],
  loading: false,
  error: null
};

const playersReducer = (state = initialState, action) => {
  switch (action.type) {

    case `${types.GET_PLAYERS}_PENDING`: {
      return {
        ...state,
        loading: true
      };
    }

    case `${types.GET_PLAYERS}_FULFILLED`: {
      return {
        ...state,
        players: action.payload,
        loading: false
      };
    }

    case `${types.GET_PLAYERS}_REJECTED`: {
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    }

    default:
      return state;
  }
};

export default playersReducer;
