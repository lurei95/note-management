import { NoteActionKind } from './noteActionKind';
import { ActionBase } from '../actionBase';

/**
 * Action: all notes of a category are deleted
 */
export class NotesOfCategoryDeleteAction extends ActionBase<string>
{
  /**
   * Constructor
   * 
   * @param {string} payload ID of the category of which all notes are deleted
   */
  constructor(public payload: string) { super(NoteActionKind.NotesOfCategoryDelete, payload); }
}