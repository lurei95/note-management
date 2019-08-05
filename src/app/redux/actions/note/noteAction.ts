import { NoteActionKind } from './noteActionKind';
import { ActionBase } from '../actionBase';
import { NoteModel } from 'src/app/models/notes/noteModel';

/**
 * Action performed on the state related to {@link NoteModel}
 */
export class NoteAction extends ActionBase<NoteModel>
{
  /**
   * Constructor
   * 
   * @param {NoteActionKind} actionKind Type of the action
   * @param {NoteModel} payload The note involved in the action
   */
  constructor(actionKind: NoteActionKind, public payload: NoteModel) 
  { super(actionKind, payload) }
}