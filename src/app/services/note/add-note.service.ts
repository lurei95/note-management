import { Store } from '@ngrx/store';
import { v4 as uuid } from 'uuid';
import { Injectable } from '@angular/core';
import { IServiceBase } from '../service';
import { NoteDisplayModel } from 'src/app/models/noteModel';
import { IApplicationState } from 'src/app/redux/reducers';
import { NoteActionKind, NoteAction } from 'src/app/redux/actions/notes';

@Injectable({
  providedIn: 'root'
})
export class AddNoteService implements IServiceBase<string>
{

  constructor(private store: Store<IApplicationState>) { }

  execute(parameter: string) 
  { 
    let model = new NoteDisplayModel(uuid());
    model.isEditing = true;
    model.categoryId = parameter;
    this.store.dispatch(new NoteAction(NoteActionKind.NoteAdd, model));
   }
}