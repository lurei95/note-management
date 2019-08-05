import { Injectable } from '@angular/core';
import { IDeleteService } from '../base/iDeleteService';
import { CategoryModel } from 'src/app/models/categories/categoryModel';
import { IEditableModel } from 'src/app/models/iEditableModel';

/**
 * Mock service for {@link AddCategoryService}
 */
@Injectable({
  providedIn: 'root'
})
export class DeleteServiceMock<TModel extends IEditableModel<TModel>> implements IDeleteService<TModel>
{
  /**
   * Parameter the service was executed with
   */
  parameter: TModel;

  /**
   * Constructor
   */
  constructor() { }

  /**
   * Executes the service: deletes the category
   * 
   * @param {TModel} parameter Category to delete
   */
  execute(parameter: TModel) { this.parameter = parameter; }
}