import { NoteModel } from 'src/app/models/noteModel';
import { LocalizationService, LocalizationArgument } from './../../services/localization.service';
import { ValidateNoteService } from './../../services/note/validate-note.service';
import { SaveNoteService } from '../../services/note/save-note.service';
import { DialogResult } from '../dialogs/dialogResult';
import { CancelableDialogComponent } from '../dialogs/cancelable-dialog/cancelable-dialog.component';
import { Component } from '@angular/core';
import { DeleteNoteService } from 'src/app/services/note/delete-note.service';
import { MatDialog } from '@angular/material/dialog';
import { clone, coalesce } from 'src/app/util/utility';
import { NoteDialogComponent } from '../dialogs/note-dialog/note-dialog.component';
import { NoteComponentBase } from '../noteComponentBase';
import { MessageKind } from 'src/app/messageKind';
import { CancelableDialogData } from '../dialogs/cancelable-dialog/cancelableDialogParam';
import { IApplicationState } from 'src/app/redux/state';
import { Store } from '@ngrx/store';

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
   * @param {LocalizationService} localizationService Injected: service for getting localized strings
   * @param {MatDialog} dialog Injected: service for showing a dialog
   * @param {Store<IApplicationState>} store Injected: redux store
   */
  constructor(validationService: ValidateNoteService, saveService: SaveNoteService, 
    private deleteService: DeleteNoteService, private localizationService: LocalizationService,
    private dialog: MatDialog, store: Store<IApplicationState>) 
  { super(validationService, saveService, store); }

  /**
   * Event handler: opens the note in a more detailed edit dialog
   */
  openEditDialog() 
  { 
    if ((this.invalidNoteId == null || this.invalidNoteId == this.note.id) 
      && this.invalidCategoryId == null)
    {
      this.dialog.open(NoteDialogComponent, { 
        data: clone<NoteModel>(this.note, NoteModel),
        panelClass: 'fullscreenDialog',
        disableClose: true
      }); 
    }
  }

  /**
   * Event handler: deletes the note
   */
  onDeleteButtonClicked() 
  {
    let text = this.localizationService.execute(
      new LocalizationArgument(MessageKind.DeleteNoteDialogText, {title: coalesce(this.note.title)}));
    let title = this.localizationService.execute(
      new LocalizationArgument(MessageKind.DeleteNoteDialogTitle));
    let buttonCaption = this.localizationService.execute(new LocalizationArgument(MessageKind.Delete));
    let data = new CancelableDialogData(text, title, buttonCaption);

    const dialogRef = this.dialog.open(CancelableDialogComponent, { data: data });
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
    if(result == DialogResult.Delete)
      this.deleteService.execute(this.note); 
  }
}