import { DialogInformation } from '../dialogInformation';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LocalizationService } from 'src/app/services/localization.service';
import { ComponentBase } from '../../componentBase';

/**
 * Dialog with a cancel option
 */
@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
})
export class MessageDialogComponent extends ComponentBase
{
  private _data: DialogInformation;
  /**
   * @returns {DialogInformation} The data of the dialog
   */
  get data(): DialogInformation { return this._data; }

  private _buttons: ButtonInformation[] = [];
  /**
   * @returns {ButtonInformation[]} The buttons the dialog should have
   */
  get buttons() : ButtonInformation[] { return this._buttons; }

  /**
   * Constructor
   * 
   * @param {DialogInformation} data Injected: The data of the dialog
   * @param {LocalizationService} localizationService Injected: service for providing localized strings
   * @param {MatDialogRef<MessageDialogComponent>} self Injected: reference to the own dialog
   */
  constructor(@Inject(MAT_DIALOG_DATA) data: DialogInformation, 
    localizationService: LocalizationService, private self: MatDialogRef<MessageDialogComponent>) 
  { 
    super();
    this._data = data; 
    data.buttons.forEach(item => 
    {
      let info = new ButtonInformation();
      info.caption = localizationService.execute(item);
      info.result = item;
      this._buttons.push(info);
    });
  }

  /**
   * Event handler: Enables close 
   * (workaround for keeping dialog from immediatly closing when opened with esc)
   */
  ngAfterViewInit() { setTimeout(() => this.self.disableClose = false); }
}


class ButtonInformation
{
  result: string;
  caption: string;
}