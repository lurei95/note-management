import { CategoryModel } from './../../models/categories/categoryModel';
import { Action } from '@ngrx/store';
import { CategoryActionKind } from '../actions/category/categoryActionKind';
import { SelectedCategoryChangeAction } from '../actions/category/selectedCategoryChangeAction';
import { CategoryValidityChangeAction } from '../actions/category/categoryValidityChangeAction';
import { NewCategoryChangeAction } from '../actions/category/newCategoryChangeAction';

const defaultState = {
  selectedCategory: null,
  invalidCategoryId: null,
  newCategoryId: null
}

/**
 * Reducer-function for changing the state related to {@link CategoryModel}
 * 
 * @param {string} state The current state
 * @param {Action} The action which changes the state
 */
export function categoryReducer(state: 
    {selectedCategory: CategoryModel, invalidCategoryId: string, newCategoryId: string} = defaultState, 
  action: Action) 
{
  switch (action.type) 
  {
    case CategoryActionKind.CategoryValidityChange:
    {
      state.invalidCategoryId = (action as CategoryValidityChangeAction).payload;
      return state;
    }
    case CategoryActionKind.SelectedCategoryChange:
    {
      state.selectedCategory = (action as SelectedCategoryChangeAction).payload;
      return state;
    }
    case CategoryActionKind.NewCategoryChange:
    {
      state.newCategoryId = (action as NewCategoryChangeAction).payload;
      return state;
    }
    default:
      return state;
  }
}