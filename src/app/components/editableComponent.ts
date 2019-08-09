import { Dictionary } from 'src/app/util/dictionary';
import { Input } from '@angular/core';
import { EditableModel } from '../models/editableModel';
import { ModelService } from '../services/base/modelService';

/**
 * Base class for all components for editing a certain type of model
 */
export abstract class EditableComponent<TModel extends EditableModel>
{
  private _model: TModel
  /**
   * @param {TModel} value The model which is edited in the component
   */
  @Input() set model(value: TModel) 
  {
    this._model = value; 
    this.unmodified = (value.clone() as TModel);
  }
  /**
   * @returns {TModel} The model which is edited in the component
   */
  get model() : TModel { return this._model; }

  /**
   * The unmodified version of the model
   */
  protected unmodified: TModel

  /**
   * Constructor
   * 
   * @param {Model<ModelService>} service Injected: service for the model
   */
  constructor(protected service: ModelService<TModel>)
  { }

  /**
   * Event handler: tries to save the changes on pressing the save shortcut (ctrl + s)
   * 
   * @param {Event} e The event
   */
  handleSaveShortcut(e: Event)
  {
    if(e != null)
    {
      e.preventDefault();
      e.stopPropagation();
    }
    this.trySaveChanges();
  }

  /**
   * Returns if the model has changes in comparison to the unmodified version
   * 
   * @returns {boolean} If the model has changes in comparison to the unmodified version
   */
  hasChanges() : boolean { return !this.model.equals(this.unmodified); }

  /**
   * Tries to save the changes of the model
   * 
   * @returns {boolean} If changes have been saved
   */
  protected trySaveChanges() : boolean
  {
    if (this.validateModel())
    {
      if (!this.hasChanges())
        return true;

      this.saveChanges();
      return true;
    }
    return false;
  }

  /**
   * Saves the changes of the model 
   */
  protected saveChanges()
  {
    this.unmodified = (this.model.clone() as TModel);
    this.service.save(this.model);
  }

  /**
   * Validates the model 
   * 
   * @returns {boolean} If the model is valid
   */
  protected validateModel(): boolean
  {
    let result = this.service.validate(this.model);
    return this.handleValidationResult(result);
  }

  /**
   * Method for handling the validation result of the model
   * 
   * @param {Dictionary<string>} result The validation result
   * @returns {boolean} Whether the model should be saved
   */
  protected abstract handleValidationResult(result: Dictionary<string>): boolean
}