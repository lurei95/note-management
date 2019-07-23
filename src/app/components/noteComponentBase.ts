import { EditableComponent } from './editableComponent';
import { NoteDisplayModel } from '../models/noteModel';
import { ElementRef, ViewChild, Input } from '@angular/core';
import { Dictionary } from '../util/dictionary';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { clone } from '../util/utility';

export abstract class NoteComponentBase extends EditableComponent<NoteDisplayModel>
{
  /**
   * Editor for the RichEditControl
   */
  editor = ClassicEditor;

  /**
   * Input for the title of the note
   */
  @ViewChild("titleInput", {static: false}) protected titleInput: ElementRef;

  /**
   * @returns {NoteDisplayModel} The note which is edited in the component
   */
  get note(): NoteDisplayModel { return this.model; }
  /**
   * @param {NoteDisplayModel} value The note which is edited in the component
   */
  @Input()
  set note(value: NoteDisplayModel) 
  { 
    this.unmodified = clone<NoteDisplayModel>(value, NoteDisplayModel);
    this.model = value; 
    if(this.model.isEditing && this.titleInput != null)
      this.titleInput.nativeElement.focus();
  }

  private _titleError: string;
  /**
   * @returns {string} The error message for the title of the note
   */
  get titleError(): string { return this._titleError; }

  /**
   * Focuses the title input if the note is currently edited
   */
  ngAfterViewInit() 
  {
    if(this.note.isEditing && this.titleInput != null)
      this.titleInput.nativeElement.focus();
  }

  /**
   * Event handler: validates the note to reset the error when the title is changed
   */
  onTitleChanged() { this.validateModel(); }

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
      this.titleInput.nativeElement.focus();
      return false;
    }
    else
    {
      this.model.isEditing = false;
      return true;
    }
  }
}  