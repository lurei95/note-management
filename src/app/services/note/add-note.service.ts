import { Store } from '@ngrx/store';
import { v4 as uuid } from 'uuid';
import { Injectable } from '@angular/core';
import { IServiceBase } from '../base/iServiceBase';
import { NoteAction } from 'src/app/redux/actions/note/noteAction';
import { NoteActionKind } from 'src/app/redux/actions/note/noteActionKind';
import { IApplicationState } from 'src/app/redux/state';
import { NoteModel } from 'src/app/models/noteModel';
import { MatDialog } from '@angular/material/dialog';
import { NoteDialogComponent } from 'src/app/components/dialogs/note-dialog/note-dialog.component';

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
  constructor(private store: Store<IApplicationState>, private dialog: MatDialog) { }

  /**
   * Executes the service: Adds a new note
   * 
   * @param {string} parameter Id of the category the note is added to
   */
  execute(parameter: string) 
  { 
    let model = new NoteModel(uuid());
    model.categoryId = parameter;
    this.store.dispatch(new NoteAction(NoteActionKind.NoteAdd, model));
    
    this.dialog.open(NoteDialogComponent, { 
      data: model,
      panelClass: 'fullscreenDialog',
      disableClose: true
    });
  }
}