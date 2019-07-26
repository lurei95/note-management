import { NoteActionKind } from '../actions/note/noteActionKind';
import { NoteValidityChangeAction } from '../actions/note/noteValidityChangeAction';

/**
 * Reducer-function for changing the state related to {@link NoteModel}
 * 
 * @param {string} state The current state
 * @param {NoteValidityChangeAction} action The action which changes the state
 */
export function noteValidityReducer(state: string = null, action: NoteValidityChangeAction) 
{   
  switch (action.type) 
  {
    case NoteActionKind.NoteValidityChange:
      return action.payload;
    default:
      return state;
  }
}