import { Action } from '@ngrx/store';
import * as categories from '../actions/category'
import { CategoryModel } from 'src/app/models/categoryModel';

export function selectedCategoryReducer(state: CategoryModel = null, action: Action) 
{
    switch (action.type) 
    {
      case categories.CategoryActionKind.SelectedCategoryChange:
        return (action as categories.CategoryAction).payload;
      default:
        return state
  }
}