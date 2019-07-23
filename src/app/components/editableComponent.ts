import { IEditableModel } from '../models/iEditableModel';

/**
 * Base class for all components for editing a certain type of model
 */
export abstract class EditableComponent<TEditable extends IEditableModel<TEditable>>
{
  /**
   * The model which is edited in the component
   */
  protected model: TEditable

  /**
   * Validates the model
   * 
   * @returns {boolean} If the model is valid (can be saved)
   */
  validateModel(): boolean { return this.model.isValid(); }
}