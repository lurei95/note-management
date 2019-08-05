import { MessageDialogService } from '../message-dialog.service';
import { DialogResult } from 'src/app/components/utiltity/dialogResult';

/**
 * Mock service for {@link MessageDialogService}
 */
export class MessageDialogServiceMock extends MessageDialogService
{
  /**
   * The title of the dialog
   */
  title: string;
  /**
   * The text of the dialog
   */
  text: string;
  /**
   * The buttons the dialog should have
   */
  buttons: DialogResult[];
  /**
   * Callback function when the dialog is closed
   */
  callback: (result: DialogResult) => void;

  constructor() { super(null); }

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
    this.title = title;
    this.text = text;
    this.buttons = buttons;
    this.callback = callback;
  }
}