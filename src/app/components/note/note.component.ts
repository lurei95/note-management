import { ValidateNoteService } from './../../services/note/validate-note.service';
import { SaveNoteService } from '../../services/note/save-note.service';
import { NoteDisplayModel } from '../../models/noteModel';
import { DialogResult } from '../dialogs/dialogResult';
import { NoteDeleteDialogComponent } from '../dialogs/note-delete-dialog/note-delete-dialog.component';
import { Component } from '@angular/core';
import { DeleteNoteService } from 'src/app/services/note/delete-note.service';
import { MatDialog } from '@angular/material/dialog';
import { clone } from 'src/app/util/utility';
import { NoteDialogComponent } from '../dialogs/note-dialog/note-dialog.component';
import { NoteComponentBase } from '../noteComponentBase';

/**
 * Component for displaying and editing a note
 */
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent extends NoteComponentBase
{
  private isPointingOver: boolean;

  /**
   * Constructor
   * 
   * @param {ValidateNoteService} validationService Injected: service for validating the note
   * @param {SaveNoteService} saveService Injected: service for saving changes to the note
   * @param {DeleteNoteService} deleteService Injected: service for deleting the note
   * @param {MatDialog} dialog Injected: service for showing a dialog
   */
  constructor(validationService: ValidateNoteService, saveService: SaveNoteService, 
    private deleteService: DeleteNoteService, private dialog: MatDialog) 
  { super(validationService, saveService); }

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
      data: this.note.title == null ? "" : this.note.title
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
   * Event handler: tries to save the changes to the note on leaving focus
   */
  onFocusLeaving() 
  {
    if (this.isPointingOver)
      return;
      this.trySaveChanges();
  }

  private onDeleteDialogFinished(result: string)
  {
    if(result == DialogResult.Confirm)
      this.deleteService.execute(this.note); 
  }
}