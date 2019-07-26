import { ActionBase } from '../actionBase';
import { CategoryActionKind } from './categoryActionKind';

/**
 * Action: validity of a category is changed
 */
export class CategoryValidityChangeAction extends ActionBase<string>
{
  /**
   * Constructor
   * 
   * @param {string} payload Id of the invalid category
   */
  constructor(public payload: string) { super(CategoryActionKind.CategoryValidityChange, payload)}
}