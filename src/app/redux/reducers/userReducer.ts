import { UserChangeAction } from './../actions/user/userChangeAction';
import { UserActionKind } from './../actions/user/userActionKind';
import { UserModel } from './../../models/users/userModel';
import { Action } from '@ngrx/store';

/**
 * Reducer-function for changing the state related to {@link UserModel}
 * 
 * @param {UserModel} state The current state
 * @param {Action} The action which changes the state
 */
export function userReducer(state: UserModel = null, action: Action) 
{   
  switch (action.type) 
  {
    case UserActionKind.UserChange:
      return (action as UserChangeAction).payload;
    default:
      return state;
  }
}