import { Action } from '@ngrx/store'

/**
 * Action kind: search text is changed
 */
export const SEARCH_TEXT_CHANGE = '[SearchText] Change'

/**
 * Action: Search text is changed
 */
export class SearchTextChangeAction implements Action 
{
  /**
   * Type of the action
   */
  type = SEARCH_TEXT_CHANGE;

  /**
   * Constructor
   * 
   * @param {string} payload The new search text
   * @param {string} fieldName The name of the field the search text is used for
   */
  constructor(public payload: string, public fieldName: string) {}
}