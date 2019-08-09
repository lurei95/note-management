import { CategoryModel } from 'src/app/models/categories/categoryModel';
import { CategoryActionKind } from './categoryActionKind';
import { ActionBase } from '../actionBase';

/**
 * Action performed on the state related to {@link CategoryModel}
 */
export class SelectedCategoryChangeAction extends ActionBase<CategoryModel>
{
  /**
   * Constructor
   * 
   * @param {CategoryActionKind} actionKind Type of the action
   * @param {CategoryModel} payload The category involved in the action
   */
  constructor(public payload: CategoryModel) 
  { super(CategoryActionKind.SelectedCategoryChange, payload)}
}
