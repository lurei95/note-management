import { Action } from '@ngrx/store'
import { NoteDisplayModel } from 'src/app/models/noteModel';

/**
 * Kind of action performed on the state related to {@link NoteModel}
 */
export enum NoteActionKind 
{
  /**
   * Note is deleted
   */
  NoteDelete = 'NoteDelete',
  /**
   * Note is added
   */
  NoteAdd = 'NoteAdd',
  /**
   * Notes are retrieved
   */
  NotesRetrieved = 'NotesRetrieved',
  /**
   * Note is saved/changed
   */
  NoteUpdate = 'NoteUpdate',
  /**
   * All notes of a category are deleted
   */
  NotesOfCategoryDelete ="NotesOfCategoryDelete"
}

/**
 * Action performed on the state related to {@link NoteModel}
 */
export class NoteAction implements Action 
{
  /**
   * Type of the action
   */
  type: string;

  /**
   * Constructor
   * 
   * @param {NoteActionKind} actionKind Type of the action
   * @param {NoteDisplayModel} payload The note involved in the action
   */
  constructor(actionKind: NoteActionKind, public payload: NoteDisplayModel) 
  { this.type = actionKind; }
}

/**
 * Action: notes are retrieved
 */
export class NotesRetrievedAction implements Action 
{
  /**
   * Type of the action
   */
  type = NoteActionKind.NotesRetrieved

  /**
   * Constructor
   * 
   * @param {NoteDisplayModel} payload The category involved in the action
   */
  constructor(public payload: NoteDisplayModel[]) { }
}

/**
 * Action: all notes of a category are deleted
 */
export class NotesOfCategoryDeleteAction implements Action 
{
  /**
   * Type of the action
   */
  type = NoteActionKind.NotesOfCategoryDelete

  /**
   * Constructor
   * 
   * @param {string} payload ID of the category of which all notes are deleted
   */
  constructor(public payload: string) { }
}