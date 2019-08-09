import { TitleChangeAction } from './../actions/other/titleChangeAction';
import { OtherActionKind } from './../actions/other/otherActionKind';
import { Action } from '@ngrx/store';

/**
 * Reducer-function for changing the title of the app
 * 
 * @param {string} state The current state
 * @param {Action} The action which changes the state
 */
export function titleReducer(state: string = null, action: Action) 
{   
  switch (action.type) 
  {
    case OtherActionKind.TitleChange:
      return (action as TitleChangeAction).payload;
    default:
      return state;
  }
}