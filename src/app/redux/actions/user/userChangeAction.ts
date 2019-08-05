import { UserModel } from './../../../models/users/userModel';
import { ActionBase } from '../actionBase';
import { UserActionKind } from './userActionKind';

/**
 * Kind of action performed on the state related to {@link UserModel}
 */
export class UserChangeAction extends ActionBase<UserModel>
{
  /**
   * Constructor
   * 
   * @param {UserModel} payload The new user
   */
  constructor(public payload: UserModel) { super(UserActionKind.UserChange, payload); }
}