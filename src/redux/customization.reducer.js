// project imports

// action - state management
import * as actionTypes from './actions';

export const initialState = {
  mode: 'light'
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const customizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_COLOR_MODE:
      return {
        ...state,
        mode: action.mode
      };
    default:
      return state;
  }
};

export default customizationReducer;
