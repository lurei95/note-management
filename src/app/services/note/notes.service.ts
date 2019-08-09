import { truncate, nullOrEmpty } from 'src/app/util/utility';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { IApplicationState, getInvalidNoteId } from 'src/app/redux/state';
import { NoteModel } from 'src/app/models/notes/noteModel';
import { DatabaseService } from '../database.service';
import { ModelService } from '../base/modelService';
import { MessageKind } from 'src/app/messageKind';
import { NotificationService } from '../notification/notificationService';
import { LocalizationService } from '../localization.service';
import { NoteValidityChangeAction } from 'src/app/redux/actions/note/noteValidityChangeAction';
import { Dictionary } from 'src/app/util/dictionary';
import { DocumentData } from '@angular/fire/firestore';

/**
 * Service for retrieving all exisiting notes
 */
@Injectable({
  providedIn: 'root'
})
export class NotesService extends ModelService<NoteModel>
{
  /**
   * @returns {string} The path to the collection for the model type
   */
  protected get path(): string { return "notes"; }

  /**
   * Constructor
   * 
   * @param {Store<IApplicationState>} store Injected: redux store
   * @param {DatabaseService} store Injected: service for accessing the firebase db
   * @param {NotificationService} notificationService Injected: service for displaying notfications
   * @param {LocalizationService} localizationService Injected: service for providing localized strings
   */
  constructor(store: Store<IApplicationState>, databaseService: DatabaseService, 
    private notificationService: NotificationService,
    private localizationService: LocalizationService) 
  { super(store, databaseService); }

  /**
   * Executes the service: deletes the note
   * 
   * @param {NoteModel} parameter Note to delete
   */
  delete(parameter: NoteModel) 
  {
    this.unsetInvalidNote(parameter.id);

    super.delete(parameter);

    const message = this.localizationService.execute(MessageKind.DeleteNoteMessage, 
      { title: truncate(parameter.title, 10) });
    this.notificationService.notifySuccessMessage(message);
  }

  /**
   * Executes the service: Saves the note
   * 
   * @param {NoteModel} parameter Note to save
   */
  save(parameter: NoteModel) 
  { 
    super.save(parameter);

    const message = this.localizationService.execute(MessageKind.SaveNoteMessage, 
      { title: truncate(parameter.title, 10) });
    this.notificationService.notifySuccessMessage(message);
  }

  /**
   * Executes the service: Validates the note
   * 
   * @param {NoteModel} parameter Note to validate
   * @return {Dictionary<string>} A Dictionary containing value pairs: (property name, error message)
   */
  validate(parameter: NoteModel): Dictionary<string> 
  {
    let result = super.validate(parameter);
    if (nullOrEmpty(parameter.title))
    {
      let message = this.localizationService.execute(MessageKind.RequiredField);
      result.add("title", message);
    }
    return result;
  }

  /**
   * Maps the doucment data to the model
   * 
   * @param {DocumentData} data The data to map to the model
   * @returns {NoteModel} The mdoel
   */
  protected map(data: DocumentData): NoteModel
  { 
    let model = Object.assign(new NoteModel(), data);
    if (data._dueDate != null)
      model.dueDate = data._dueDate.toDate();
    return model;
  };

  private unsetInvalidNote(noteId: string)
  {
    this.store.select(getInvalidNoteId).subscribe((x: string) => 
    {
      if (x == noteId)
        this.store.dispatch(new NoteValidityChangeAction(null));
    });
  }
}