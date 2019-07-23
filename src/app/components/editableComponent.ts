import { Dictionary } from 'src/app/util/dictionary';
import { IValidationService } from './../services/base/iValidationService';
import { IEditableModel } from '../models/iEditableModel';
import { ISaveService } from '../services/base/iSaveService';

/**
 * Base class for all components for editing a certain type of model
 */
export abstract class EditableComponent<TModel extends IEditableModel<TModel>>
{
  /**
   * The model which is edited in the component
   */
  protected model: TModel

  /**
   * The unmodified version of the model
   */
  protected unmodified: TModel

  /**
   * Constructor
   * 
   * @param {IValidationService<TModel>} validationService Injected: service for validating the model
   * @param {ISaveService<TModel>} saveService Injected: service for saving changes to the model
   */
  constructor(private validationService: IValidationService<TModel>, 
    private saveService: ISaveService<TModel>)
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
   * Tries to save the changes of the model 
   */
  protected trySaveChanges() : boolean
  {
    if (this.model.equals(this.unmodified))
      return;

    if (this.validateModel())
    {
      this.unmodified = this.model.clone();
      this.saveService.execute(this.model);
      return true;
    }
    return false;
  }

  /**
   * Validates the model 
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