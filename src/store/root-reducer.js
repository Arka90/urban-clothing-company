import { combineReducers } from "redux";
import logger from "redux-logger";

import { userReducer } from "../context/user.context";

export const rootReducer = combineReducers({
  user: userReducer,
});
