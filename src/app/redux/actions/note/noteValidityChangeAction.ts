import { NoteActionKind } from './noteActionKind';
import { ActionBase } from '../actionBase';

/**
 * Action: validity of a note is changed
 */
export class NoteValidityChangeAction extends ActionBase<string>
{
  /**
   * Constructor
   * 
   * @param {string} payload Id of the invalid category
   */
  constructor(public payload: string) { super(NoteActionKind.NoteValidityChange, payload)}
}