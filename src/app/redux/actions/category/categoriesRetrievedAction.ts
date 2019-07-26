import { CategoryActionKind } from './categoryActionKind';
import { ActionBase } from '../actionBase';
import { CategoryModel } from 'src/app/models/categoryModel';

/**
 * Action: categories are retrieved
 */
export class CategoriesRetrievedAction extends ActionBase<CategoryModel[]>
{
  /**
   * Constructor
   * 
   * @param {CategoryModel[]} payload The retrieved categories
   */
  constructor(public payload: CategoryModel[]) 
  { super(CategoryActionKind.CategoriesRetrieved, payload) }
}