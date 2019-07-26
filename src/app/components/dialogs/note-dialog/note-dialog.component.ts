import { ValidateNoteService } from './../../../services/note/validate-note.service';
import { SaveNoteService } from './../../../services/note/save-note.service';
import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { nullOrEmpty } from 'src/app/util/utility';
import { NoteComponentBase } from '../../noteComponentBase';
import { NoteModel } from 'src/app/models/noteModel';
import { Store } from '@ngrx/store';
import { IApplicationState } from 'src/app/redux/state';

/**
 * Dialog for editing a note
 */
@Component({
  selector: 'app-note-dialog',
  templateUrl: './note-dialog.component.html',
  styleUrls: ['./note-dialog.component.css'],
})
export class NoteDialogComponent extends NoteComponentBase
{
  @ViewChild("textAreaDiv", {static: false}) private textAreaDiv: ElementRef;
  @ViewChild("propertyAreaDiv", {static: false}) private propertyAreaDiv: ElementRef;
  @ViewChild("titleAreaDiv", {static: false}) private titleAreaDiv: ElementRef;
  @ViewChild("headerLine", {static: false}) private headerLine: ElementRef;
  @ViewChild("container", {static: false}) private container: ElementRef;
  @ViewChild("titleInput", {static: false}) private titleInput: ElementRef;

  /**
   * Seperator key codes for the tag control
   */
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  private _isExpanded: boolean;
  /**
   * @returns {boolean} Whether the dialog is in expanded mode or not
   */
  get isExpanded(): boolean { return this._isExpanded; }
  
  /**
   * Constructor
   * 
   * @param {NoteModel} data Injected: the note passed into the dialog
   * @param {ValidateNoteService} validationService Injected: service for validating the note
   * @param {SaveNoteService} saveService Injected: service for saving the changes of the note
   * @param {MatDialogRef<NoteDialogComponent>} dialog Injected: reference to the own dialog
   * @param {Store<IApplicationState>} store Injected: redux store
   */
  constructor(@Inject(MAT_DIALOG_DATA) data: NoteModel, validationService: ValidateNoteService,
    saveService: SaveNoteService, private dialog: MatDialogRef<NoteDialogComponent>, 
    store: Store<IApplicationState>) 
  { 
    super(validationService, saveService, store);
    this.note = data; 
  }

  /**
   * Event handler: expands or shrinks the dialog
   */
  onExpandButtonClicked() 
  { 
    this._isExpanded = !this._isExpanded; 
    this.calculateEditorHeight();
  }

  /**
   * Event handler: closes the dialog
   */
  onCloseButtonClicked() { this.tryCloseDialog(); }

  /**
   * Event handler: adds a new tag
   * 
   * @param {MatChipInputEvent} event Input event for the tag control
   */
  add(event: MatChipInputEvent)
  {
    const input = event.input;
    const value = event.value.trim();
    if (!nullOrEmpty(value) && ! this.note.tags.some(tag => tag == value)) 
    {
      this.note.tags.push(value);
      this.calculateEditorHeight();
    }
    if (input) 
      input.value = '';
  }

  /**
   * Event handler: removes tag
   * 
   * @param {string} tag The tag to remove
   */
  remove(tag: string)
  {
    const index = this.note.tags.indexOf(tag);
    if (index >= 0) 
    {
      this.note.tags.splice(index, 1);
      this.calculateEditorHeight();
    }
  }

  /**
   * Focuses the title input if the note is currently edited
   */
  ngAfterViewInit() 
  {
    setTimeout(() =>
    {
      if(this.titleInput != null)
      this.titleInput.nativeElement.focus();
    }, 400);
    this.calculateEditorHeight();
  }

  private calculateEditorHeight()
  {
    setTimeout(() =>
    {
      let maxHeight = this.container.nativeElement.offsetHeight
      - this.titleAreaDiv.nativeElement.offsetHeight
      - this.headerLine.nativeElement.offsetHeight
      - this.propertyAreaDiv.nativeElement.offsetHeight;

      this.textAreaDiv.nativeElement.style.maxHeight = (maxHeight - 20 + "px");
    });
  }

  private tryCloseDialog()
  {
    if(this.trySaveChanges())
      this.dialog.close();
  }
}