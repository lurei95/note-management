import { IEditableModel } from './iEditableModel';
import { nullOrEmpty } from '../util/utility';

/**
 * Model for a category containing multiple notes
 */
export class CategoryModel implements IEditableModel<CategoryDisplayModel>
{
  /**
   * @returns {string} ID of the category
   */
  get id(): string { return this._id; }

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
  constructor(private _id?: string, private _title? : string) { }

  /**
   * Tests if the model is valid for saving
   * 
   * @returns {boolean} Whether the model is valid for saving
   */
  isValid(): boolean { return !nullOrEmpty(this.title); }

  /**
   * Tests if the model is equal to the other model
   * 
   * @param {CategoryModel} model The other model to compare to
   * @returns {boolean} Whether the two models equals
   */
  equals(model: CategoryModel): boolean 
  { return this.id == model.id  && this.title == model.title; }
}

/**
 * Model of a category for displaying purpose
 */
export class CategoryDisplayModel extends CategoryModel
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
}