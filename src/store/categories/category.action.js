import { CATEGORIES_ACTION_TYPES } from "./catagory.type";

import { createAction } from "../../utils/reducer/reducer.utils";

export const setCategories = (categories) =>
  createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categories);
