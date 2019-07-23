import { Injectable } from '@angular/core';
import { NoteDisplayModel } from 'src/app/models/noteModel';
import { IApplicationState } from 'src/app/redux/reducers';
import { Store } from '@ngrx/store';
import { NoteAction, NoteActionKind } from 'src/app/redux/actions/notes';
import { truncate } from 'src/app/util/utility';
import { NotificationService } from '../notification/notificationService';
import { ISaveService } from '../base/iSaveService';

/**
 * Service for saving changes to a note
 */
@Injectable({
  providedIn: 'root'
})
export class SaveNoteService implements ISaveService<NoteDisplayModel> 
{
  /**
   * Constructor
   * 
   * @param {Store<IApplicationState>} store Injected: redux store
   * @param {NotificationService} notificationService Injected: service for displaying notifications
   */
  constructor(private store: Store<IApplicationState>, private notificationService: NotificationService) { }

  /**
   * Executes the service: Saves the note
   * 
   * @param {NoteDisplayModel} parameter Note to save
   */
  execute(parameter: NoteDisplayModel) 
  { 
    this.store.dispatch(new NoteAction(NoteActionKind.NoteUpdate, parameter)); 

    const message = 'Notiz "' + truncate(parameter.title, 10) + '" erfolgreich gespeichert'
    this.notificationService.notifySuccessMessage(message);
  }
}