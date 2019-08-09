import { NotesService } from './../../../services/note/notes.service';
import { MessageDialogService } from '../../../services/message-dialog.service';
import { LocalizationService } from '../../../services/localization.service';
import { DialogResult } from '../../utiltity/dialogResult';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { coalesce } from 'src/app/util/utility';
import { NoteComponentBase } from '../../noteComponentBase';
import { MessageKind } from 'src/app/messageKind';
import { IApplicationState } from 'src/app/redux/state';
import { Store } from '@ngrx/store';
import { MatExpansionPanel } from '@angular/material/expansion';
import { getDateDifferenceString } from 'src/app/util/dateUtility';
import { NoteDialogComponent } from '../note-dialog/note-dialog.component';

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
   * @param {NotesService} service Injected: service for the model
   * @param {LocalizationService} localizationService Injected: service for getting localized strings
   * @param {MatDialog} dialog Injected: service for showing a dialog
   * @param {Store<IApplicationState>} store Injected: redux store
   * @param {MessageDialogService} dialogService Injected: Service for displaying a message dialog
   */
  constructor(service: NotesService, private localizationService: LocalizationService,
    private dialog: MatDialog, store: Store<IApplicationState>,
    private dialogService: MessageDialogService) 
  { super(service, store); }

  /**
   * Event handler: opens the note in a more detailed edit dialog
   */
  openEditDialog(e: Event) 
  { 
    e.preventDefault();
    e.stopPropagation();
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

  /**
   * Event handler: prevents clicking the input from opening the dialog
   */
  handleInputClicked(e: Event) { e.stopPropagation(); }

  /**
   * Returns the remaining time to the due date of the note
   * 
   * @returns {string} The remaining time to the due date of the note
   */
  getRemainingTime(): string 
  { 
    if (this.model == null || this.model.dueDate == null)
      return null;
    return getDateDifferenceString(new Date(), this.model.dueDate);
  }

  /**
   * Toggles the expansion panel when clicking on the expander button
   * 
   * @param {MatExpansionPanel} expansionPanel The expansion panel
   * @param {Event} event The click event
   */
  togglePanel(expansionPanel: MatExpansionPanel, event: Event): void
  {
    event.stopPropagation(); // Preventing event bubbling
    
    if (!this.isExpansionIndicator(event.target))
      expansionPanel.toggle(); // Here's the magic
  }

  private handleDeleteDialogFinished(result: string)
  {
    if(result == DialogResult.Delete)
      this.service.delete(this.model); 
  }
  
  private isExpansionIndicator(target: EventTarget): boolean 
  {
    const expansionIndicatorClass = 'mat-expansion-indicator';
    return (target && (target as HTMLElement).classList.contains(expansionIndicatorClass));
  }
}