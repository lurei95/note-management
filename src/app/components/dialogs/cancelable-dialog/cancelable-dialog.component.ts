import { CancelableDialogData } from './cancelableDialogParam';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Dialog with a cancel option
 */
@Component({
  selector: 'app-cancelable-dialog',
  templateUrl: './cancelable-dialog.component.html',
})
export class CancelableDialogComponent
{
  private _data: CancelableDialogData;
  /**
   * @returns {CancelableDialogData} The data of the dialog
   */
  get data(): CancelableDialogData { return this._data; }

  /**
   * Constructor
   * 
   * @param {CancelableDialogData} data Injected: The data of the dialog
   */
  constructor(@Inject(MAT_DIALOG_DATA) data: CancelableDialogData) { this._data = data; }
}