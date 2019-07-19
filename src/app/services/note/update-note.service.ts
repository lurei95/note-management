import { Injectable } from '@angular/core';
import { IServiceBase } from '../service';
import { NoteDisplayModel } from 'src/app/models/noteModel';
import { IApplicationState } from 'src/app/redux/reducers';
import { Store } from '@ngrx/store';
import { NoteAction, NoteActionKind } from 'src/app/redux/actions/notes';

@Injectable({
  providedIn: 'root'
})
export class UpdateNoteService implements IServiceBase<NoteDisplayModel> 
{
  constructor(private store: Store<IApplicationState>) { }

  execute(parameter: NoteDisplayModel) 
  { this.store.dispatch(new NoteAction(NoteActionKind.NoteUpdate, parameter)); }
}