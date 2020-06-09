import { UserModel } from './../models/users/userModel';
import { CategoryModel } from '../models/categories/categoryModel';
import { categoryReducer } from './reducers/categoryReducer';
import { NotificationModel } from '../models/notifications/notificationModel';
import { notificationReducer } from './reducers/notificationReducer';
import { noteReducer } from './reducers/noteReducer';
import { userReducer } from './reducers/userReducer';
import { titleReducer } from './reducers/titleReducer';

/**
 * Interface defining the state of the application 
 */
export interface IApplicationState 
{
  title: string,
  user: UserModel,
  notifications: NotificationModel[],
  categoryInfo: {
    selectedCategory: CategoryModel,
    invalidCategoryId: string,
    newCategoryId: string
  },
  noteInfo: {
    invalidNoteId: string
  }
}

/**
 * Combination of the existing reducer functions 
 */
export const reducers = 
{
  title: titleReducer,
  user: userReducer,
  notifications: notificationReducer,
  noteInfo: noteReducer,
  categoryInfo: categoryReducer
}

/**
 * Returns the selected category of the current state 
 */
export const getSelectedCategory = (state: IApplicationState) => state.categoryInfo.selectedCategory

/**
 * Returns the id of the invalid category
 */
export const getInvalidCategoryId = (state: IApplicationState) => state.categoryInfo.invalidCategoryId;

/**
 * Returns the id of the newly added category
 */
export const getNewCategoryId = (state: IApplicationState) => state.categoryInfo.newCategoryId;

/**
 * Returns the id of the invalid note
 */
export const getInvalidNoteId = (state: IApplicationState) => state.noteInfo.invalidNoteId;

/**
 * Returns the currently displayed title
 */
export const getTitle = (state: IApplicationState) => state.title;

/**
 * Returns the current user
 */
export const getUser = (state: IApplicationState) => state.user;

/**
 * Returns the existing notifications of the current state 
 */
export const getNotifications = (state: IApplicationState) => state.notifications;