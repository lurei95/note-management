import { UserModel } from './../models/users/userModel';
import { CategoryModel } from '../models/categories/categoryModel';
import { categoryReducer } from './reducers/categoryReducer';
import { NotificationModel } from 'src/app/models/notifications/notificationModel';
import { notificationReducer } from './reducers/notificationReducer';
import { noteValidityReducer } from './reducers/noteValidityReducer';
import { categoryValidityReducer } from './reducers/categoryValidityReducer';
import { userReducer } from './reducers/userReducer';

/**
 * Interface defining the state of the application 
 */
export interface IApplicationState 
{
  user: UserModel,
  notifications: NotificationModel[],
  selectedCategory: CategoryModel,
  invalidCategoryId: string,
  invalidNoteId: string
}

/**
 * Combination of the existing reducer functions 
 */
export const reducers = {
  user: userReducer,
  selectedCategory: categoryReducer,
  notifications: notificationReducer,
  invalidCategoryId: categoryValidityReducer,
  invalidNoteId: noteValidityReducer
}

/**
 * Returns the current user
 */
export const getUser = (state: IApplicationState) => state.user;

/**
 * Returns the id of the invalid note
 */
export const getInvalidNoteId = (state: IApplicationState) => state.invalidNoteId;

/**
 * Returns the id of the invalid category
 */
export const getInvalidCategoryId = (state: IApplicationState) => state.invalidCategoryId;

/**
 * Returns the existing notifications of the current state 
 */
export const getNotifications = (state: IApplicationState) => state.notifications;

/**
 * Returns the selected category of the current state 
 */
export const getSelectedCategory = (state: IApplicationState) => state.selectedCategory