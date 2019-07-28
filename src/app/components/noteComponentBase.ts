import { EditableComponent } from './editableComponent';
import { ElementRef, ViewChild, Input } from '@angular/core';
import { Dictionary } from '../util/dictionary';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { clone } from '../util/utility';
import { NoteModel } from '../models/noteModel';
import { ValidateNoteService } from '../services/note/validate-note.service';
import { SaveNoteService } from '../services/note/save-note.service';
import { getInvalidNoteId, getInvalidCategoryId, IApplicationState } from '../redux/state';
import { Store } from '@ngrx/store';
import { NoteValidityChangeAction } from '../redux/actions/note/noteValidityChangeAction';

export abstract class NoteComponentBase extends EditableComponent<NoteModel>
{
  /**
   * Editor for the RichEditControl
   */
  editor = ClassicEditor;

  private _invalidCategoryId: string;
  /**
   * @returns {string} Id of the invalid category
   */
  protected get invalidCategoryId(): string { return this._invalidCategoryId; }

  private _invalidNoteId: string;
  /**
   * @returns {string} Id of the invalid note
   */
  protected get invalidNoteId(): string { return this._invalidNoteId; }

  private _titleError: string;
  /**
   * @returns {string} The error message for the title of the note
   */
  get titleError(): string { return this._titleError; }

  /**
   * Constructor
   * 
   * @param {ValidateNoteService} validationService Injected: service for validating the note
   * @param {SaveNoteService} saveService Injected: service for saving changes to the note
   * @param {Store<IApplicationState>} store Injected: redux store
   */
  constructor(validationService: ValidateNoteService, saveService: SaveNoteService, 
    private store: Store<IApplicationState>) 
  { 
    super(validationService, saveService);
    store.select(getInvalidCategoryId).subscribe((x: string) => this._invalidCategoryId = x);
    store.select(getInvalidNoteId).subscribe((x: string) => this._invalidNoteId = x);
  }

  /**
   * Event handler: validates the note to reset the error when the title is changed
   */
  handleTitleChanged() { this.validateModel(); }

  /**
   * Method for handling the validation result of the model
   * 
   * @param {Dictionary<string>} result The validation result
   * @returns {boolean} Whether the model should be saved
   */
  protected handleValidationResult(result: Dictionary<string>): boolean
  {
    if (result.containsKey("title"))
    {
      this._titleError = result["title"];

      if (this._invalidNoteId != this.model.id)
        this.store.dispatch(new NoteValidityChangeAction(this.model.id));
      return false;
    }
    else
    {
      if (this._invalidNoteId == this.model.id)
        this.store.dispatch(new NoteValidityChangeAction(null));
      this._titleError = null;
      return true;
    }
  }
}  