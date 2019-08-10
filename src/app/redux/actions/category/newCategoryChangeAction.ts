import { ActionBase } from '../actionBase';
import { CategoryActionKind } from './categoryActionKind';

/**
 * Action: new category is changed
 */
export class NewCategoryChangeAction extends ActionBase<string>
{
  /**
   * Constructor
   * 
   * @param {string} payload Id of the new category
   */
  constructor(public payload: string) { super(CategoryActionKind.NewCategoryChange, payload)}
}