/**
 * Tests if the model is valid for saving
 * 
 * @param TModel Type of the model
 */
export abstract class EditableModel
{
  /**
   * @returns {string} ID of the category
   */
  get id(): string { return this._id; }
  /**
   * @param {string} value ID of the category
   */
  set id(value: string) { this._id = value; }

  private _timestamp: number = null;
  /**
   * @returns {number} Timestamp when the model was created
   */
  get timestamp(): number { return this._timestamp; }
  /**
   * @param {number} value Timestamp when the model was created
   */
  set timestamp(value: number) { this._timestamp = value; }

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
  constructor(private _id?: string) 
  { }

  /**
   * Tests if the model is equal to the other model
   * 
   * @param {TModel} model The other model to compare to
   * @returns {boolean} Whether the two models equals
   */
  abstract equals(item: EditableModel): boolean;

  /**
   * Clones the model
   * 
   * @returns {EditableModel} A cloned version of the model
   */
  abstract clone(): EditableModel
}