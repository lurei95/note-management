import { CategoryActionKind } from './categoryActionKind';
import { ActionBase } from '../actionBase';
import { CategoryModel } from 'src/app/models/categories/categoryModel';

/**
 * Action performed on the state related to {@link CategoryModel}
 */
export class CategoryAction extends ActionBase<CategoryModel>
{
  /**
   * Constructor
   * 
   * @param {CategoryActionKind} actionKind Type of the action
   * @param {CategoryModel} payload The category involved in the action
   */
  constructor(actionKind: CategoryActionKind, public payload: CategoryModel) 
  { super(actionKind, payload)}
}
