import { DialogResult } from './dialogResult';

export class DialogInformation
{
  /**
   * @returns {string} The text of the dialog
   */
  get text(): string { return this._text; }

  /**
   * @returns {string} The title of the dialog
   */
  get title(): string { return this._title; }

  /**
   * @returns {DialogResult[]} The available buttons of the dialog
   */
  get buttons(): DialogResult[] { return this._buttons; }

  /**
   * Constructor
   * 
   * @param {string} _text The text of the dialog
   * @param {string} _title The title of the dialog
   * @param {DialogResult[]} _buttons The available buttons of the dialog
   */
  constructor(private _text: string, private _title: string, private _buttons: DialogResult[]) { }
}