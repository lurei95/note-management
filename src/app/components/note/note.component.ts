import { MessageDialogService } from './../../services/message-dialog.service';
import { LocalizationService } from './../../services/localization.service';
import { ValidateNoteService } from './../../services/note/validate-note.service';
import { SaveNoteService } from '../../services/note/save-note.service';
import { DialogResult } from '../dialogs/dialogResult';
import { Component } from '@angular/core';
import { DeleteNoteService } from 'src/app/services/note/delete-note.service';
import { MatDialog } from '@angular/material/dialog';
import { coalesce } from 'src/app/util/utility';
import { NoteDialogComponent } from '../dialogs/note-dialog/note-dialog.component';
import { NoteComponentBase } from '../noteComponentBase';
import { MessageKind } from 'src/app/messageKind';
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
   * @param {MessageDialogService} dialogService Injected: Service for displaying a message dialog
   */
  constructor(validationService: ValidateNoteService, saveService: SaveNoteService, 
    private deleteService: DeleteNoteService, private localizationService: LocalizationService,
    private dialog: MatDialog, store: Store<IApplicationState>, 
    private dialogService: MessageDialogService) 
  { super(validationService, saveService, store); }

  /**
   * Event handler: opens the note in a more detailed edit dialog
   */
  openEditDialog() 
  { 
    if ((this.invalidNoteId == null || this.invalidNoteId == this.model.id) 
      && this.invalidCategoryId == null)
    {
      this.dialog.open(NoteDialogComponent, { 
        data: this.model.clone(),
        panelClass: 'fullscreenDialog',
        disableClose: true
      }); 
    }
  }

  /**
   * Event handler: deletes the note
   */
  handleDeleteButtonClicked() 
  {
    let text = this.localizationService.execute(MessageKind.DeleteNoteDialogText, 
      {title: coalesce(this.model.title)});
    let title = this.localizationService.execute(MessageKind.DeleteNoteDialogTitle);
    this.dialogService.execute(title, text, [DialogResult.Delete, DialogResult.Cancel], 
      result => this.handleDeleteDialogFinished(result));
  }

  /**
   * Event handler: pointer is over the component
   */
  handlePointerEnter() { this.isPointingOver = true; }

  /**
   * Event handler: pointer is not over the component
   */
  handlePointerLeave() { this.isPointingOver = false; }

  /**
   * Event handler: tries to save the changes to the note on leaving focus
   */
  handleFocusLeaving() 
  {
    if (this.isPointingOver)
      return;
    this.trySaveChanges();
  }

  private handleDeleteDialogFinished(result: string)
  {
    if(result == DialogResult.Delete)
      this.deleteService.execute(this.model); 
  }
}