import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { IServiceBase } from '../base/iServiceBase';
import { NotesRetrievedAction } from 'src/app/redux/actions/note/notesRetrievedAction';
import { IApplicationState } from 'src/app/redux/state';
import { NoteModel } from 'src/app/models/notes/noteModel';

/**
 * Service for retrieving all exisiting notes
 */
@Injectable({
  providedIn: 'root'
})
export class RetrieveNotesService implements IServiceBase
{
  /**
   * Constructor
   * 
   * @param {Store<IApplicationState>} store Injected: redux store
   */
  constructor(private store: Store<IApplicationState>) { }

  /**
   * Executes the service: Retrieves all exisiting notes
   */
  execute() 
  {
    let notes = [
      new NoteModel("7AF05F69-FBB3-4923-BFAE-0C2E3272FDA6", "Note 1", 
        "Das ist das erste Note.", "1522BA08-C407-458A-9E93-ED94CD8DBF1B"), 
      new NoteModel("1BAEC900-DBC7-434A-BEB1-DC299A759ABC", "Note 2", 
        "Das ist das zweite Note.", "1522BA08-C407-458A-9E93-ED94CD8DBF1B"),
      new NoteModel("EB574C1B-2071-4AA3-A053-844247DA2CF6", "Note 3",
        "Das ist das dritte Note.", "1522BA08-C407-458A-9E93-ED94CD8DBF1B"),
      new NoteModel("629DA917-D9AD-49EA-ABC9-F5F6D0223930", "Note 4",
        "Das ist das vierte Note.", "1522BA08-C407-458A-9E93-ED94CD8DBF1B")
    ];
    this.store.dispatch(new NotesRetrievedAction(notes));
  }
}