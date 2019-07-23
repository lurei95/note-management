import { strictEqual } from 'assert';
import { Store } from '@ngrx/store';
import { v4 as uuid } from 'uuid';
import { Injectable } from '@angular/core';
import { IServiceBase } from '../base/iServiceBase';
import { NoteDisplayModel } from 'src/app/models/noteModel';
import { IApplicationState } from 'src/app/redux/reducers';
import { NoteActionKind, NoteAction } from 'src/app/redux/actions/notes';

/**
 * Service for adding a new note
 */
@Injectable({
  providedIn: 'root'
})
export class AddNoteService implements IServiceBase<string>
{
  /**
   * Constructor
   * 
   * @param {Store<IApplicationState>} store Injected: redux store
   */
  constructor(private store: Store<IApplicationState>) { }

  /**
   * Executes the service: Adds a new note
   * 
   * @param {string} parameter Id of the category the note is added to
   */
  execute(parameter: string) 
  { 
    let model = new NoteDisplayModel(uuid());
    model.isEditing = true;
    model.categoryId = parameter;
    this.store.dispatch(new NoteAction(NoteActionKind.NoteAdd, model));
   }
}