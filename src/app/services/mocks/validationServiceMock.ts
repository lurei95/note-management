import { Dictionary } from './../../util/dictionary';
import { ISaveService } from './../base/iSaveService';
import { IEditableModel } from 'src/app/models/iEditableModel';
import { IValidationService } from '../base/iValidationService';

/**
 * Mock service for {@link IValidationService<TModel>}
 */
export class ValidationServiceMock<TModel extends IEditableModel<TModel>> 
  implements IValidationService<TModel>
{
  /**
   * Parameter the service was executed with
   */
  parameter: TModel;

  /**
   * The result the service should return
   */
  result: Dictionary<string>;

  /**
   * Executes the service
   * 
   * @param {TModel} parameter Parameter the service was executed with
   * @returns {Dictionary<string>} The result the service should return
   */
  execute(parameter: TModel) : Dictionary<string>
  { 
    this.parameter = parameter 
    return this.result;
  } 
}