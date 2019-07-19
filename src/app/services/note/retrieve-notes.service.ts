import { IApplicationState } from '../../redux/reducers/index';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { NoteDisplayModel } from '../../models/noteModel';
import { NotesRetrievedAction } from '../../redux/actions/notes';
import { IServiceBase } from '../service';

@Injectable({
  providedIn: 'root'
})
export class RetrieveNotesService implements IServiceBase<string>
{
  constructor(private store: Store<IApplicationState>) { }

  execute(categoryId: string) 
  {
    let notes = [
      new NoteDisplayModel("7AF05F69-FBB3-4923-BFAE-0C2E3272FDA6", "Note 1", 
        "Das ist das erste Note.", categoryId), 
      new NoteDisplayModel("1BAEC900-DBC7-434A-BEB1-DC299A759ABC", "Note 2", 
        "Das ist das zweite Note.", categoryId),
      new NoteDisplayModel("EB574C1B-2071-4AA3-A053-844247DA2CF6", "Note 3",
        "Das ist das dritte Note.", categoryId),
      new NoteDisplayModel("629DA917-D9AD-49EA-ABC9-F5F6D0223930", "Note 4",
        "Das ist das vierte Note.", categoryId)
    ];
    this.store.dispatch(new NotesRetrievedAction(notes));
  }
}