import { LocalizationService } from 'src/app/services/localization.service';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { truncate } from 'src/app/util/utility';
import { NotificationService } from '../notification/notificationService';
import { IDeleteService } from '../base/iDeleteService';
import { NoteAction } from 'src/app/redux/actions/note/noteAction';
import { NoteActionKind } from 'src/app/redux/actions/note/noteActionKind';
import { IApplicationState, getInvalidNoteId } from 'src/app/redux/state';
import { NoteModel } from 'src/app/models/noteModel';
import { MessageKind } from 'src/app/messageKind';
import { NoteValidityChangeAction } from 'src/app/redux/actions/note/noteValidityChangeAction';

/**
 * Service for deleting a note
 */
@Injectable({
  providedIn: 'root'
})
export class DeleteNoteService implements IDeleteService<NoteModel> 
{
  /**
   * Constructor
   * 
   * @param {Store<IApplicationState>} store Injected: redux store
   * @param {NotificationService} notificationService Injected: service for displaying notifications
   * @param {LocalizationService} localizationService Injected: service for getting localized strings
   */
  constructor(private store: Store<IApplicationState>, 
    private notificationService: NotificationService,
    private localizationService: LocalizationService) 
  { }

  /**
   * Executes the service: deletes the note
   * 
   * @param {NoteModel} parameter Note to delete
   */
  execute(parameter: NoteModel) 
  {
    this.store.dispatch(new NoteAction(NoteActionKind.NoteDelete, parameter));
    this.unsetInvalidCategory(parameter.id);

    const message = this.localizationService.execute(MessageKind.DeleteNoteMessage, 
      truncate(parameter.title, 10));
    this.notificationService.notifySuccessMessage(message);
  }

  private unsetInvalidCategory(noteId: string)
  {
    let invalidNoteId: string;
    this.store.select(getInvalidNoteId).subscribe((x: string) => invalidNoteId = x);
    if (invalidNoteId == noteId)
      this.store.dispatch(new NoteValidityChangeAction(null));
  }
}