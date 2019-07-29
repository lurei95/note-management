import { ISaveService } from './../base/iSaveService';
import { IEditableModel } from 'src/app/models/iEditableModel';

/**
 * Mock service for {@link ISaveService<TModel>}
 */
export class SaveServiceMock<TModel extends IEditableModel<TModel>> implements ISaveService<TModel>
{
  /**
   * Parameter the service was executed with
   */
  parameter: TModel;

  /**
   * Executes the service
   * 
   * @param {TModel} parameter Parameter the service was executed with
   */
  execute(parameter: TModel) { this.parameter = parameter } 
}