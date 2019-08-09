import { clone } from 'src/app/util/utility';
import { EditableModel } from '../editableModel';

/**
 * Model for a category containing multiple notes
 */
export class CategoryModel extends EditableModel
{
  private _isEditing: boolean;
  /**
   * @returns {boolean} Whether the model is currently edited
   */
  get isEditing(): boolean { return this._isEditing; }
  /**
   * @param {boolean} value Whether the model is currently edited
   */
  set isEditing(value: boolean) { this._isEditing = value; }

  /**
   * @returns {string} Title of the category
   */
  get title(): string { return this._title; }
  /**
   * @param {string} value Title of the category
   */
  set title(value: string) { this._title = value; }

  /**
   * Constructor
   * 
   * @param {string} _id ID of the category
   * @param {string} _title Title of the category
   */
  constructor(_id?: string, private _title? : string) { super(_id); }

  /**
   * Tests if the model is equal to the other model
   * 
   * @param {CategoryModel} model The other model to compare to
   * @returns {boolean} Whether the two models equals
   */
  equals(model: CategoryModel): boolean 
  { return this.id == model.id  && this.title == model.title; }

  /**
   * Clones the model
   * 
   * @returns {CategoryModel} A cloned version of the model
   */
  clone(): CategoryModel { return clone<CategoryModel>(this, CategoryModel); }
}