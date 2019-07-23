import { NotesOfCategoryDeleteAction } from './../actions/notes';
import { Action } from '@ngrx/store';
import { NoteDisplayModel } from 'src/app/models/noteModel';
import { clone } from 'src/app/util/utility';
import { NoteAction, NoteActionKind, NotesRetrievedAction } from '../actions/notes';

/**
 * Reducer-function for changing the state related to {@link NoteModel}
 * 
 * @param {NoteDisplayModel[]} state The current state
 * @param {Action} The action which changes the state
 */
export function notesReducer(state: NoteDisplayModel[] = [], action: Action) 
{   
  let note = (<NoteAction>action).payload;
  switch (action.type) 
  {
    case NoteActionKind.NoteUpdate:
      let index = state.findIndex(note1 => note1.id == note.id);
      let newState = [...state];
      newState[index] = clone<NoteDisplayModel>(note, NoteDisplayModel);
      return newState;
    case NoteActionKind.NoteAdd:
      return [...state, clone<NoteDisplayModel>(note, NoteDisplayModel)];     
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