import { NoteActionKind } from '../actions/note/noteActionKind';
import { Action } from '@ngrx/store';
import { NoteValidityChangeAction } from '../actions/note/noteValidityChangeAction';

/**
 * Reducer-function for changing the state related to {@link NoteModel}
 * 
 * @param {string} state The current state
 * @param {Action} action The action which changes the state
 */
export function noteValidityReducer(state: string = null, action: Action) 
{   
  switch (action.type) 
  {
    case NoteActionKind.NoteValidityChange:
      return (action as NoteValidityChangeAction).payload;
    default:
      return state;
  }
}