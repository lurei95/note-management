/**
 * Data required for {@link CancelableDialogComponent}
 */
export class CancelableDialogData
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
   * @returns {string} The caption for the button
   */
  get buttonCaption(): string { return this._buttonCaption; }

  /**
   * Constructor
   * 
   * @param {string} _text The text of the dialog
   * @param {string} _title The title of the dialog
   * @param {string} _buttonCaption The caption for the button
   */
  constructor(private _text: string, private _title: string, private _buttonCaption: string) { }
}