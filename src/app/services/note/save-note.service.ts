import { MessageKind } from 'src/app/messageKind';
import { LocalizationService } from 'src/app/services/localization.service';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { truncate } from 'src/app/util/utility';
import { NotificationService } from '../notification/notificationService';
import { ISaveService } from '../base/iSaveService';
import { NoteAction } from 'src/app/redux/actions/note/noteAction';
import { NoteActionKind } from 'src/app/redux/actions/note/noteActionKind';
import { IApplicationState } from 'src/app/redux/state';
import { NoteModel } from 'src/app/models/noteModel';

/**
 * Service for saving changes to a note
 */
@Injectable({
  providedIn: 'root'
})
export class SaveNoteService implements ISaveService<NoteModel> 
{
  /**
   * Constructor
   * 
   * @param {Store<IApplicationState>} store Injected: redux store
   * @param {LocalizationService} localizationService Injected: service for getting localized strings
   * @param {NotificationService} notificationService Injected: service for displaying notifications
   */
  constructor(private store: Store<IApplicationState>, private localizationService: LocalizationService,
    private notificationService: NotificationService) { }

  /**
   * Executes the service: Saves the note
   * 
   * @param {NoteModel} parameter Note to save
   */
  execute(parameter: NoteModel) 
  { 
    this.store.dispatch(new NoteAction(NoteActionKind.NoteUpdate, parameter)); 

    const message = this.localizationService.execute(MessageKind.SaveNoteMessage, 
      { title: truncate(parameter.title, 10) });
    this.notificationService.notifySuccessMessage(message);
  }
}