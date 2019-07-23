import { IEditableModel } from './../../models/iEditableModel';
import { IServiceBase } from './iServiceBase';

/**
 * Interface of a service for saving changes to a model
 */
export interface ISaveService<TModel extends IEditableModel<TModel>> extends IServiceBase<TModel>
{ }