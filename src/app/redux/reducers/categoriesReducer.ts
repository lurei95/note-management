import { SelectableList } from './../../util/selectableList';
import { CategoryAction, CategoryActionKind, CategoriesRetrievedAction } from './../actions/category';
import { Action } from '@ngrx/store';
import { CategoryDisplayModel } from 'src/app/models/categoryModel';
import { clone } from 'src/app/util/utility';

/**
 * Reducer-function for changing the state related to {@link CategoryModel}
 * 
 * @param {SelectableList<CategoryDisplayModel>} state The current state
 * @param {Action} The action which changes the state
 */
export function categoriesReducer(state: SelectableList<CategoryDisplayModel> 
  = new SelectableList<CategoryDisplayModel>(), action: Action) 
{
  let category = (<CategoryAction>action).payload;
  switch (action.type) 
  {
    case CategoryActionKind.SelectedCategoryChange:
      state.selectedItem = category;
      return state;
    case CategoryActionKind.CategoryUpdate:
      let index = state.findIndex(category1 => category1.id == category.id);
      state.items[index] = clone<CategoryDisplayModel>(category, CategoryDisplayModel);
      return state;
    case CategoryActionKind.CategoryAdd:   
      state.add(category);
      return state;
    case CategoryActionKind.CategoryDelete:
      state.remove(item => item.id == category.id);
      return state; 
    case CategoryActionKind.CategoriesRetrieved:
      let items = (<CategoriesRetrievedAction>action).payload
      state = new SelectableList<CategoryDisplayModel>(items, state.selectedItem);
      return state;
    default:
      return state;
  }
}