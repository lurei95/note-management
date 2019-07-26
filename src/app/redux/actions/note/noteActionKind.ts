/**
 * Kind of action performed on the state related to {@link NoteModel}
 */
export enum NoteActionKind 
{
  /**
   * The validity of a edited note is changed
   */
  NoteValidityChange = 'NoteValidityChange',
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