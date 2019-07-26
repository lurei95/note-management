import { CategoryValidityChangeAction } from '../actions/category/categoryValidityChangeAction';
import { CategoryActionKind } from '../actions/category/categoryActionKind';

/**
 * Reducer-function for changing the state related to {@link NoteModel}
 * 
 * @param {string} state The current state
 * @param {CategoryValidityChangeAction} action The action which changes the state
 */
export function categoryValidityReducer(state: string = null, action: CategoryValidityChangeAction) 
{   
  switch (action.type) 
  {
    case CategoryActionKind.CategoryValidityChange:
      return action.payload;
    default:
      return state;
  }
}