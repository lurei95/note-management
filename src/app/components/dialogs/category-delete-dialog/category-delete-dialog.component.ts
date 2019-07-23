import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Dialog for asking the user if he really wants to delete the category
 */
@Component({
  selector: 'app-category-delete-dialog',
  templateUrl: './category-delete-dialog.component.html',
})
export class CategoryDeleteDialogComponent
{
  private _title: string;
  /**
   * @returns {string} The title of the category
   */
  get title(): string { return this._title; }

  /**
   * Constructor
   * 
   * @param {string} data Injected: the title of the category which is about to be deleted
   */
  constructor(@Inject(MAT_DIALOG_DATA) data: string) { this._title = data; }
}