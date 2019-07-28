import { clone } from 'src/app/util/utility';
import { Dictionary } from 'src/app/util/dictionary';
import { IValidationService } from './../services/base/iValidationService';
import { IEditableModel } from '../models/iEditableModel';
import { ISaveService } from '../services/base/iSaveService';
import { Input } from '@angular/core';

/**
 * Base class for all components for editing a certain type of model
 */
export abstract class EditableComponent<TModel extends IEditableModel<TModel>>
{
  private _model: TModel
  /**
   * @param {TModel} value The model which is edited in the component
   */
  @Input() set model(value: TModel) 
  {
    this._model = value; 
    this.unmodified = value.clone();
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
   * @returns {IValidationService<TModel>} Service for validating the model
   */
  protected get validationService(): IValidationService<TModel> { return this._validationService; }

  /**
   * @returns {ISaveService<TModel>} Service for saving changes to the model
   */
  protected get saveService(): ISaveService<TModel> { return this._saveService; }

  /**
   * Constructor
   * 
   * @param {IValidationService<TModel>} _validationService Injected: service for validating the model
   * @param {ISaveService<TModel>} _saveService Injected: service for saving changes to the model
   */
  constructor(private _validationService: IValidationService<TModel>, 
    private _saveService: ISaveService<TModel>)
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
    this.unmodified = this.model.clone();
    this.saveService.execute(this.model);
  }

  /**
   * Validates the model 
   * 
   * @returns {boolean} If the model is valid
   */
  protected validateModel(): boolean
  {
    let result = this.validationService.execute(this.model);
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