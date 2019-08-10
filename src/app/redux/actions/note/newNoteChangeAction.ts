import { ActionBase } from '../actionBase';
import { NoteActionKind } from './noteActionKind';

/**
 * Action: new category is changed
 */
export class NewNoteChangeAction extends ActionBase<string>
{
  /**
   * Constructor
   * 
   * @param {string} payload Id of the new note
   */
  constructor(public payload: string) { super(NoteActionKind.NewNoteChange, payload)}
}