import { CategoryModel } from './../models/categoryModel';
import { SelectableList } from '../util/selectableList';
import { noteReducer } from './reducers/noteReducer';
import { categoryReducer } from './reducers/categoryReducer';
import { NotificationModel } from 'src/app/models/notificationModel';
import { notificationReducer } from './reducers/notificationReducer';
import { noteValidityReducer } from './reducers/noteValidityReducer';
import { categoryValidityReducer } from './reducers/categoryValidityReducer';
import { NoteModel } from '../models/noteModel';

/**
 * Interface defining the state of the application 
 */
export interface IApplicationState 
{
    notes: NoteModel[],
    notifications: NotificationModel[],
    categoryInformation: SelectableList<CategoryModel>
    invalidCategoryId: string,
    invalidNoteId: string
}

/**
 * Combination of the existing reducer functions 
 */
export const reducers = {
    notes: noteReducer,
    categoryInformation: categoryReducer,
    notifications: notificationReducer,
    invalidCategoryId: categoryValidityReducer,
    invalidNoteId: noteValidityReducer
}

/**
 * Returns the id of the invalid note
 */
export const getInvalidNoteId = (state: IApplicationState) => state.invalidNoteId;

/**
 * Returns the id of the invalid category
 */
export const getInvalidCategoryId = (state: IApplicationState) => state.invalidCategoryId;

/**
 * Returns the existing notes of the current state 
 */
export const getNotes = (state: IApplicationState) => state.notes;

/**
 * Returns the existing notes of the category
 */
export const getNotesOfCategory = (state: IApplicationState, id: string) => 
{ return state.notes.filter(note => note.categoryId == id); }

/**
 * Returns a specific note of the current state specified by its id
 */
export const getNote = (state: IApplicationState, id: string) => state.notes.find(note => note.id == id);

/**
 * Returns the existing notifications of the current state 
 */
export const getNotifications = (state: IApplicationState) => state.notifications;

/**
 * Returns the existing categories of the current state 
 */
export const getCategories = (state: IApplicationState) => state.categoryInformation.items;

/**
 * Returns the selected category of the current state 
 */
export const getSelectedCatgeory = (state: IApplicationState) => state.categoryInformation.selectedItem;