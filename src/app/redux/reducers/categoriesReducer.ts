import { CategoryAction, CategoryActionKind, CategoriesRetrievedAction } from './../actions/category';
import { Action } from '@ngrx/store';
import { CategoryModel, CategoryDisplayModel } from 'src/app/models/categoryModel';
import { clone } from 'src/app/util/utility';

export function categoriesReducer(state: CategoryModel[] = [], action: Action) 
{
  let category : CategoryDisplayModel;
  if(typeof(CategoryAction) == typeof(CategoryAction))
    category = (<CategoryAction>action).payload;

  switch (action.type) 
  {
    case CategoryActionKind.CategoryUpdate:
      let index = state.findIndex(category1 => category1.id == category.id);
      let newState = [...state];
      newState[index] = clone<CategoryDisplayModel>(category, CategoryDisplayModel);
      return newState;
    case CategoryActionKind.CategoryAdd:
      return [...state, clone<CategoryDisplayModel>(category, CategoryDisplayModel)];     
    case CategoryActionKind.CategoryDelete:
      return [...state.filter(item => item.id != category.id)];
    case CategoryActionKind.CategoriesRetrieved:
      return (<CategoriesRetrievedAction>action).payload;
    default:
      return state
  }
}