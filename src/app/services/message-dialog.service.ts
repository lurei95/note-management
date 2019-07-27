import { DialogResult } from './../components/dialogs/dialogResult';
import { DialogInformation } from '../components/dialogs/dialogInformation';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../components/dialogs/message-dialog/message-dialog.component';

export class MessageDialogService
{
  /**
   * Constructor
   * 
   * @param {MatDialog} dialog Injected: service for showing a dialog
   */
  constructor(private dialog: MatDialog) 
  { }

  execute(title: string, text: string, buttons: DialogResult[], 
    callback: (result: DialogResult) => void)
  {
    let data = new DialogInformation(text, title, buttons);
    const dialogRef = this.dialog.open(MessageDialogComponent, { data: data });
    dialogRef.afterClosed().subscribe(result => callback(result));
  }
}