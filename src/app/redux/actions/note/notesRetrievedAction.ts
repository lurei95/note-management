import { NoteActionKind } from './noteActionKind';
import { ActionBase } from '../actionBase';
import { NoteModel } from 'src/app/models/notes/noteModel';

/**
 * Action: notes are retrieved
 */
export class NotesRetrievedAction extends ActionBase<NoteModel[]>
{
  /**
   * Constructor
   * 
   * @param {NoteModel[]} payload The retrieved notes
   */
  constructor(public payload: NoteModel[]) { super(NoteActionKind.NotesRetrieved, payload); }
}