import { Action } from '@ngrx/store';
import { NoteDisplayModel } from 'src/app/models/noteModel';
import { clone } from 'src/app/util/utility';
import { NoteAction, NoteActionKind, NotesRetrievedAction } from '../actions/notes';

export function notesReducer(state: NoteDisplayModel[] = [], action: Action) 
{   
  let note : NoteDisplayModel;
  if(typeof(NoteAction) == typeof(NoteAction))
    note = (<NoteAction>action).payload;

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
    default:
      return state
  }
}