import { SelectableList } from './../../util/selectableList';
import { Action } from '@ngrx/store';
import { clone } from 'src/app/util/utility';
import { CategoryActionKind } from '../actions/category/categoryActionKind';
import { CategoriesRetrievedAction } from '../actions/category/categoriesRetrievedAction';
import { CategoryAction } from '../actions/category/categoryAction';
import { CategoryModel } from 'src/app/models/categoryModel';
import { stat } from 'fs';

/**
 * Reducer-function for changing the state related to {@link CategoryModel}
 * 
 * @param {SelectableList<CategoryModel>} state The current state
 * @param {Action} The action which changes the state
 */
export function categoriesReducer(state: SelectableList<CategoryModel> 
  = new SelectableList<CategoryModel>(), action: Action) 
{
  let newState: SelectableList<CategoryModel>;
  let category = (<CategoryAction>action).payload;
  switch (action.type) 
  {
    case CategoryActionKind.SelectedCategoryChange:
      newState = new SelectableList([...state.items], category);
      return newState;
    case CategoryActionKind.CategoryUpdate:
      let index = state.findIndex(category1 => category1.id == category.id);
      state.items[index] = clone<CategoryModel>(category, CategoryModel);
      return state;
    case CategoryActionKind.CategoryAdd:   
      newState = new SelectableList([...state.items], state.selectedItem);
      newState.add(category);
      return newState;
    case CategoryActionKind.CategoryDelete:
      newState = new SelectableList([...state.items], state.selectedItem);
      newState.remove(item => item.id == category.id);
      return newState; 
    case CategoryActionKind.CategoriesRetrieved:
      let items = (<CategoriesRetrievedAction>action).payload
      state = new SelectableList<CategoryModel>(items, state.selectedItem);
      return state;
    default:
      return state;
  }
}