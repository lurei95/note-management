import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Dialog for asking the user if he really wants to delete the note 
 */
@Component({
  selector: 'app-note-delete-dialog',
  templateUrl: './note-delete-dialog.component.html',
})
export class NoteDeleteDialogComponent
{
  private _title: string;
  /**
   * @returns {string} The title of the note
   */
  get title(): string { return this._title; }

  /**
   * Constructor
   * 
   * @param {string} data Injected: the title of the note which is about to be deleted
   */
  constructor(@Inject(MAT_DIALOG_DATA) data: string) { this._title = data; }
}