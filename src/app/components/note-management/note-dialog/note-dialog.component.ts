import { LocalizationService } from '../../../services/localization.service';
import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoteComponentBase } from '../../noteComponentBase';
import { NoteModel } from '../../../models/notes/noteModel';
import { Store } from '@ngrx/store';
import { IApplicationState } from '../../../redux/state';
import { MessageKind } from '../../../messageKind';
import { DialogResult } from '../../utiltity/dialogResult';
import { MessageDialogService } from '../../../services/message-dialog.service';
import { PriorityKind } from '../../../models/notes/priorityKind';
import { NotesService } from '../../../services/note/notes.service';

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
   * @returns Type of PriorityKind
   */
  get priorityEnumType() { return PriorityKind; }

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
   * @param {NotesService} service Injected: service for the model
   * @param {MatDialogRef<NoteDialogComponent>} self Injected: reference to the own dialog
   * @param {Store<IApplicationState>} store Injected: redux store
   * @param {LocalizationService} localizationService Injected: service for getting localized strings
   * @param {MessageDialogService} dialogService Injected: Service for displaying a message dialog
   */
  constructor(@Inject(MAT_DIALOG_DATA) data: NoteModel, service: NotesService, 
    private self: MatDialogRef<NoteDialogComponent>, store: Store<IApplicationState>, 
    private localizationService: LocalizationService, 
    private dialogService: MessageDialogService) 
  { 
    super(service, store);
    this.model = data;
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
   * Event handler: changes the tags of the note
   * 
   * @param {string[]} tags The new tags
   */
  handleTagsChanged(tags: string[]) 
  {
    this.model.tags = tags; 
    this.calculateEditorHeight();
  }

  /**
   * Event handler: changes the priority of the note
   * 
   * @param {PriorityKind} priority The new priority
   */
  onPriorityChanged(priority: PriorityKind) { this.model.priority = priority; }

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

    if (this.hasChanges() || this.model.timestamp == null)
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

      this.textAreaDiv.nativeElement.style.maxHeight = (maxHeight - 60 + "px");
    });
  }

  private handleSaveChangesDialogFinished(result: string)
  {
    if (result == DialogResult.Yes)
      this.tryCloseDialog();
    else if (result == DialogResult.No)
    {
      if (this.model.timestamp == null)
        this.service.delete(this.model);
      this.tryCloseDialog(false);
    }
  }

  private tryCloseDialog(saveChanges: boolean = true)
  {
    if(!saveChanges || this.trySaveChanges())
      this.self.close();
  }
}