import { Action } from '@ngrx/store';
import * as notes from '../actions/notes'
import { NoteModel } from 'src/app/models/noteModel';

export function reducer(state: NoteModel[] = [], action: Action) {
    switch (action.type) 
    {
      case notes.NOTE_ADD:
        return [...state, (<notes.NotesActionBase>action).payload];     
      case notes.NOTE_DELETE:
        return [...state.filter(item => item !== (<notes.NotesActionBase>action).payload)];
      case notes.NOTES_RETRIEVED:
        return (<notes.NotesRetrievedAction>action).payload;
      default:
        return state
  }
}