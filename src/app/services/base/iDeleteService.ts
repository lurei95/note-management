import { IEditableModel } from './../../models/iEditableModel';
import { IServiceBase } from './iServiceBase';

/**
 * Interface of a service for deleting a model
 */
export interface IDeleteService<TModel extends IEditableModel<TModel>> extends IServiceBase<TModel>
{ }