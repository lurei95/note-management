import { CategoryModel } from './../../models/categories/categoryModel';
import { Action } from '@ngrx/store';
import { CategoryActionKind } from '../actions/category/categoryActionKind';
import { SelectedCategoryChangeAction } from '../actions/category/selectedCategoryChangeAction';

/**
 * Reducer-function for changing the state related to {@link CategoryModel}
 * 
 * @param {string} state The current state
 * @param {Action} The action which changes the state
 */
export function categoryReducer(state: CategoryModel = null, action: Action) 
{
  switch (action.type) 
  {
    case CategoryActionKind.SelectedCategoryChange:
      return (action as SelectedCategoryChangeAction).payload;
    default:
      return state;
  }
}