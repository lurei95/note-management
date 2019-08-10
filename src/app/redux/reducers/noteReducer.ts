import { NoteActionKind } from '../actions/note/noteActionKind';
import { Action } from '@ngrx/store';
import { NoteValidityChangeAction } from '../actions/note/noteValidityChangeAction';
import { stat } from 'fs';
import { NewNoteChangeAction } from '../actions/note/newNoteChangeAction';

const defaultState = {
  invalidNoteId: null,
  newNoteId: null
}

/**
 * Reducer-function for changing the state related to {@link NoteModel}
 * 
 * @param state The current state
 * @param {Action} action The action which changes the state
 */
export function noteReducer(
  state: { invalidNoteId: string, newNoteId: string } = defaultState, action: Action) 
{   
  switch (action.type) 
  {
    case NoteActionKind.NoteValidityChange:
    {
      state.invalidNoteId = (action as NoteValidityChangeAction).payload;
      return state;
    }
    case NoteActionKind.NewNoteChange:
    {
      state.newNoteId = (action as NewNoteChangeAction).payload;
      return state;
    }
    default:
      return state;
  }
}