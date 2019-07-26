import { Action } from '@ngrx/store';
import { clone } from 'src/app/util/utility';
import { NoteAction } from '../actions/note/noteAction';
import { NoteActionKind } from '../actions/note/noteActionKind';
import { NotesRetrievedAction } from '../actions/note/notesRetrievedAction';
import { NotesOfCategoryDeleteAction } from '../actions/note/notesOfCategoryDeleteAction';
import { NoteModel } from 'src/app/models/noteModel';

/**
 * Reducer-function for changing the state related to {@link NoteModel}
 * 
 * @param {NoteModel[]} state The current state
 * @param {Action} The action which changes the state
 */
export function notesReducer(state: NoteModel[] = [], action: Action) 
{   
  let note = (<NoteAction>action).payload;
  switch (action.type) 
  {
    case NoteActionKind.NoteUpdate:
      let index = state.findIndex(note1 => note1.id == note.id);
      let newState = [...state];
      newState[index] = clone<NoteModel>(note, NoteModel);
      return newState;
    case NoteActionKind.NoteAdd:
      return [...state, clone<NoteModel>(note, NoteModel)];     
    case NoteActionKind.NoteDelete:
      return [...state.filter(item => item.id != note.id)];
    case NoteActionKind.NotesRetrieved:
      return (<NotesRetrievedAction>action).payload;
    case NoteActionKind.NotesOfCategoryDelete:
      let categoryId = (<NotesOfCategoryDeleteAction>action).payload;
      return [...state.filter(item => item.categoryId != categoryId)];
    default:
      return state;
  }
}