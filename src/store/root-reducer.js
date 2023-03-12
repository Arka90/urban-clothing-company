import { combineReducers } from "redux";

import logger from "redux-logger";

import { userReducer } from "./user/user.reducer";
import { categoriesReducer } from "./categories/category.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
});
