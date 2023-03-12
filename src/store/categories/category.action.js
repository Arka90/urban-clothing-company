import { CATEGORIES_ACTION_TYPES } from "./catagory.type";

import { createAction } from "../../utils/reducer/reducer.utils";

export const setCategoriesMap = (categoriesMap) =>
  createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP, categoriesMap);
