import { IApplicationState } from './../redux/reducers/index';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { NoteModel } from '../models/noteModel';
import { NotesRetrievedAction } from '../redux/actions/notes';

@Injectable({
  providedIn: 'root'
})
export class RetrieveNotesService {

  constructor(private store: Store<IApplicationState>) { }

  retrieveNotes() {
    let notes = [
      new NoteModel("Note 1", "Das ist das erste Note."), 
      new NoteModel("Note 2", "Das ist das zweite Note."),
      new NoteModel("Note 3", "Das ist das dritte Note."),
      new NoteModel("Note 4", "Das ist das vierte Note.")
    ];
    this.store.dispatch(new NotesRetrievedAction(notes));
  }
}