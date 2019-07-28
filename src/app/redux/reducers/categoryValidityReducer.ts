import { CategoryValidityChangeAction } from '../actions/category/categoryValidityChangeAction';
import { CategoryActionKind } from '../actions/category/categoryActionKind';
import { Action } from '@ngrx/store';

/**
 * Reducer-function for changing the state related to {@link NoteModel}
 * 
 * @param {string} state The current state
 * @param {Action} action The action which changes the state
 */
export function categoryValidityReducer(state: string = null, action: Action) 
{   
  switch (action.type) 
  {
    case CategoryActionKind.CategoryValidityChange:
      return (action as CategoryValidityChangeAction).payload;
    default:
      return state;
  }
}