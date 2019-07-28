import { LocalizationService } from 'src/app/services/localization.service';
import { ValidateNoteService } from './../../../services/note/validate-note.service';
import { SaveNoteService } from './../../../services/note/save-note.service';
import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { nullOrEmpty } from 'src/app/util/utility';
import { NoteComponentBase } from '../../noteComponentBase';
import { NoteModel } from 'src/app/models/noteModel';
import { Store } from '@ngrx/store';
import { IApplicationState } from 'src/app/redux/state';
import { MessageKind } from 'src/app/messageKind';
import { DialogResult } from '../dialogResult';
import { MessageDialogService } from 'src/app/services/message-dialog.service';

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

  private _now: Date = new Date();
  /**
   * @returns {Date} The current date
   */
  get now(): Date { return this._now; }

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
   * @param {MatDialogRef<NoteDialogComponent>} self Injected: reference to the own dialog
   * @param {Store<IApplicationState>} store Injected: redux store
   * @param {LocalizationService} localizationService Injected: service for getting localized strings
   * @param {MessageDialogService} dialogService Injected: Service for displaying a message dialog
   */
  constructor(@Inject(MAT_DIALOG_DATA) data: NoteModel, validationService: ValidateNoteService,
    saveService: SaveNoteService, private self: MatDialogRef<NoteDialogComponent>, 
    store: Store<IApplicationState>, private localizationService: LocalizationService, 
    private dialogService: MessageDialogService) 
  { 
    super(validationService, saveService, store);
    this.note = data;
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

  /**
   * Event handler: expands or shrinks the dialog
   */
  handleExpandButtonClicked() 
  { 
    this._isExpanded = !this._isExpanded; 
    this.calculateEditorHeight();
  }

  /**
   * Event handler: closes the dialog
   * 
   * @param {Event} e The event
   */
  handleCloseButtonClicked(e: Event) 
  { 
    if(e != null)
    {
      e.preventDefault();
      e.stopPropagation();
    }

    if (this.hasChanges())
    {
      let text = this.localizationService.execute(MessageKind.NoteSaveChangesDialogText);
      let title = this.localizationService.execute(MessageKind.NoteSaveChangesDialogTitle);
      this.dialogService.execute(title, text, [DialogResult.Yes, DialogResult.No, DialogResult.Cancel], 
        result => this.handleSaveChangesDialogFinished(result));
    }
    else
      this.tryCloseDialog(false); 
  }

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
   * Event handler: Sets the due date of the note
   */
  handleDateChanged(date: Date) { this.model.dueDate = date; }

  /**
   * Event handler: Tries saving the changes and closing the dialog
   */
  handleSaveAndCloseShortcut() { this.tryCloseDialog(); }

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

  private handleSaveChangesDialogFinished(result: string)
  {
    if (result == DialogResult.Yes)
      this.tryCloseDialog();
    else if (result == DialogResult.No)
      this.tryCloseDialog(false);
  }

  private tryCloseDialog(saveChanges: boolean = true)
  {
    if(!saveChanges || this.trySaveChanges())
      this.self.close();
  }
}