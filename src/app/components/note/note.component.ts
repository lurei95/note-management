import { SaveNoteService } from './../../services/note/save-note.service';
import { NoteDisplayModel } from './../../models/noteModel';
import { DialogResult } from './../dialogs/dialogResult';
import { NoteDeleteDialogComponent } from '../dialogs/note-delete-dialog/note-delete-dialog.component';
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { DeleteNoteService } from 'src/app/services/note/delete-note.service';
import { MatDialog } from '@angular/material/dialog';
import { clone } from 'src/app/util/utility';
import { EditableComponent } from '../editableComponent';
import { NoteDialogComponent } from '../dialogs/note-dialog/note-dialog.component';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

/**
 * Component for displaying and editing a note
 */
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent extends EditableComponent<NoteDisplayModel>
{
  /**
   * Editor for the RichEditControl
   */
  editor = ClassicEditor;

  @ViewChild("titleInput", {static: false}) private titleInput: ElementRef;

  private isPointingOver: boolean;
  private unmodified: NoteDisplayModel;

  private _hasError: boolean;
  /**
   * @returns {boolean} If the edited note is not valid 
   */
  get hasError(): boolean { return this._hasError; }

  /**
   * The model which is edited in the component
   */
  protected model: NoteDisplayModel;
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
  /**
   * @returns {NoteDisplayModel} The note which is edited in the component
   */
  get note(): NoteDisplayModel { return this.model; }

  /**
   * Constructor
   * 
   * @param {SaveNoteService} saveService Injected: service for saving changes to the note
   * @param {DeleteNoteService} deleteService Injected: service for deleting the note
   * @param {MatDialog} dialog Injected: service for showing a dialog
   */
  constructor(private saveService: SaveNoteService, private deleteService: DeleteNoteService, 
    private dialog: MatDialog) 
  { super(); }

  /**
   * Focuses the title input if the note is currently edited
   */
  ngAfterViewInit() 
  {
    if(this.note.isEditing && this.titleInput != null)
      this.titleInput.nativeElement.focus();
  }

  /**
   * Event handler: opens the note in a more detailed edit dialog
   */
  openEditDialog() 
  { 
    this.dialog.open(NoteDialogComponent, { 
      data: clone<NoteDisplayModel>(this.note, NoteDisplayModel),
      panelClass: 'fullscreenDialog',
      disableClose: true
    }); 
  }

  /**
   * Event handler: deletes the note
   */
  onDeleteButtonClicked() 
  {
    const dialogRef = this.dialog.open(NoteDeleteDialogComponent, {
      data: this.note.title
    });

    dialogRef.afterClosed().subscribe(result => this.onDeleteDialogFinished(result));
  }

  /**
   * Event handler: pointer is over the component
   */
  onPointerEnter() { this.isPointingOver = true; }

  /**
   * Event handler: pointer is not over the component
   */
  onPointerLeave() { this.isPointingOver = false; }

  /**
   * Event handler: validates the note to reset the error when the title is changed
   */
  onTitleChanged() { this._hasError = !this.note.isValid(); }

  /**
   * Event handler: tries to save the changes to the note on leaving focus
   */
  onFocusLeaving() 
  {
    if (this.isPointingOver)
      return;
      this.trySaveChanges();
  }

  /**
   * Event handler: tries to save the changes on pressing the save shortcut (ctrl + s)
   * 
   * @param {Event} e The event
   */
  handleSaveShortcut(e: Event)
  {
    if(e != null)
    {
      e.preventDefault();
      e.stopPropagation();
    }
    this.trySaveChanges();
  }

  private trySaveChanges()
  {
    if (this.model.equals(this.unmodified))
      return;

    if (!this.validateModel())
    {
      this._hasError = true;
      this.titleInput.nativeElement.focus();
      return;
    }
    
    this.model.isEditing = false;
    this.unmodified = clone<NoteDisplayModel>(this.model, NoteDisplayModel);
    this.saveService.execute(this.note);
  }

  private onDeleteDialogFinished(result: string)
  {
    if(result == DialogResult.Confirm)
      this.deleteService.execute(this.note); 
  }
}