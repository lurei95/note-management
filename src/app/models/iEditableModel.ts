import { IEditableModel } from './iEditableModel';

/**
 * Tests if the model is valid for saving
 * 
 * @param TModel Type of the model
 */
export interface IEditableModel<TModel extends IEditableModel<TModel>>
{
  /**
   * Tests if the model is valid for saving
   * 
   * @returns {boolean} Whether the model is valid for saving
   */
  isValid() : boolean;

  /**
   * Tests if the model is equal to the other model
   * 
   * @param {TModel} model The other model to compare to
   * @returns {boolean} Whether the two models equals
   */
  equals(item: TModel): boolean;
}