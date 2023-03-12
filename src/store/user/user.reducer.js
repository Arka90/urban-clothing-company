// Action Object
import { USER_ACTION_TYPES } from "./users.types";
//Setting initial State of User
const INITIAL_STATE = {
  currentUser: null,
};

// This is our Reducer
export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      return state;
  }
};
