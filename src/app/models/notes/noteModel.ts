import { PriorityKind } from './priorityKind';
import { EditableModel } from '../editableModel';
import { clone } from '../../util/utility';

/**
 * Model for a note
 */
export class NoteModel extends EditableModel
{
  /**
   * @returns {PriorityKind} Priority of the note
   */
  get priority(): PriorityKind { return this._priority; }
  /**
   * @param {PriorityKind} value Priority of the note
   */
  set priority(value: PriorityKind) { this._priority = value; }

  private _tags: string[] = [];
  /**
   * @returns {string[]} Tags assigned to the note
   */
  get tags(): string[] { return this._tags; }
    /**
   * @param {string[]} value Tags assigned to the note
   */
  set tags(value: string[]) { this._tags = value; }

  /**
   * @returns {string} ID of the category the note belongs to
   */
  get categoryId(): string { return this._categoryId; }
  /**
   * @param {string} value ID of the category the note belongs to
   */
  set categoryId(value : string) { this._categoryId = value; }

  /**
   * @returns {string} Title of the note
   */
  get title(): string { return this._title; }
  /**
   * @param {string} value Title of the note
   */
  set title(value: string) { this._title = value; }

  /**
   * @returns {string} Content of the note
   */
  get text(): string { return this._text; }
  /**
   * @param {string} value Content of the note
   */
  set text(value: string) { this._text = value; }

  /**
   * @returns {Date} Due date of the note
   */
  get dueDate(): Date { return this._dueDate; }
  /**
   * @param {Date} value Due date of the note
   */
  set dueDate(value: Date) { this._dueDate = value; }

  /**
   * Constructor
   * 
   * @param {string} _id ID of the note
   * @param {string} _title Title of the note
   * @param {string} _text Content of the note
   * @param {string} _categoryId ID of the category the note belongs to
   * @param {Date} _dueDate Due date of the note
   * @param {PriorityKind} _priority Priority of the note (default: Low)
   */
  constructor(_id?: string, private _title?: string, private _text: string = "", 
    private _categoryId?: string, private _dueDate: Date = null, 
    private _priority: PriorityKind = PriorityKind.Low) 
  { super(_id); }

  /**
   * Tests if the model is equal to the other model
   * 
   * @param {NoteModel} model The other model to compare to
   * @returns {boolean} Whether the two models equals
   */
  equals(item: NoteModel): boolean 
  {
    let time1 = this.dueDate == null ? null : this.dueDate.getTime();
    let time2 = item.dueDate == null ? null : item.dueDate.getTime();

    let isEqual = this.id == item.id 
      && this.text == item.text 
      && this.title == item.title
      && time1 == time2 
      && this.tags.length == item.tags.length
      && this.priority == item.priority
      && this.categoryId == item.categoryId;
    if (!isEqual)
      return false;

    for(let i = 0;i < this.tags.length;i++)
      if (this.tags[i] != item.tags[i])
        return false;
    return true;
  }

  /**
   * Clones the model
   * 
   * @returns {NoteModel} A cloned version of the model
   */
  clone(): NoteModel 
  { 
    let copy = clone<NoteModel>(this, NoteModel);
    copy.tags = [...this.tags];
    if (this.dueDate != null)
      copy.dueDate = new Date(this.dueDate.getTime());
    return copy;
  }
}