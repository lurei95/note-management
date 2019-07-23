import { IEditableModel } from './../../models/iEditableModel';
import { IServiceBase } from './iServiceBase';
import { Dictionary } from 'src/app/util/dictionary';

/**
 * Interface of a service for validating a model
 */
export interface IValidationService<TModel extends IEditableModel<TModel>> 
  extends IServiceBase<TModel, Dictionary<string>>
{ }