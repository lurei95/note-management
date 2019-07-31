import { DialogResult } from './../components/dialogs/dialogResult';
import { DialogInformation } from '../components/dialogs/dialogInformation';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../components/dialogs/message-dialog/message-dialog.component';

/**
 * Service for showing a message dialog
 */
export class MessageDialogService
{
  /**
   * Constructor
   * 
   * @param {MatDialog} dialog Injected: service for showing a dialog
   */
  constructor(private dialog: MatDialog) 
  { }

  /**
   * Displays a message dialog
   * 
   * @param {string} title The title of the dialog
   * @param {string} text The text of the dialog
   * @param {DialogResult[]} buttons The buttons the dialog should have
   * @param {(result: DialogResult) => void} callback Callback function when the dialog is closed
   */
  execute(title: string, text: string, buttons: DialogResult[], 
    callback: (result: DialogResult) => void)
  {
    let data = new DialogInformation(text, title, buttons);
    const dialogRef = this.dialog.open(MessageDialogComponent, { data: data });
    dialogRef.afterClosed().subscribe(result => callback(result));
  }
}