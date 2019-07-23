import { CategoryDisplayModel } from './../../models/categoryModel';
import { Action } from '@ngrx/store'

/**
 * Kind of action performed on the state related to {@link CategoryModel}
 */
export enum CategoryActionKind 
{
  /**
   * Category is deleted
   */
  CategoryDelete = 'CategoryDelete',
  /**
   * Category is added
   */
  CategoryAdd = 'CategoryAdd',
  /**
   * Category is saved/changed
   */
  CategoryUpdate = 'CategoryUpdate',
  /**
   * Categories are retrieved
   */
  CategoriesRetrieved = 'CategoriesRetrieved',
  /**
   * The selected category is changed
   */
  SelectedCategoryChange = 'SelectedCategoryChanged'
}

/**
 * Action performed on the state related to {@link CategoryModel}
 */
export class CategoryAction implements Action 
{
  /**
   * Type of the action
   */
  type: string;

  /**
   * Constructor
   * 
   * @param {CategoryActionKind} actionKind Type of the action
   * @param {CategoryDisplayModel} payload The category involved in the action
   */
  constructor(actionKind: CategoryActionKind, public payload: CategoryDisplayModel) 
  { this.type = actionKind; }
}

/**
 * Action: categories are retrieved
 */
export class CategoriesRetrievedAction implements Action 
{
  /**
   * Type of the action
   */
  type = CategoryActionKind.CategoriesRetrieved

  /**
   * Constructor
   * 
   * @param {CategoryDisplayModel[]} payload The retrieved categories
   */
  constructor(public payload: CategoryDisplayModel[]) { }
}