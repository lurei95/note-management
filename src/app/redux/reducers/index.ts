import { SelectableList } from './../../util/selectableList';
import { CategoryDisplayModel } from '../../models/categoryModel';
import { NoteDisplayModel } from 'src/app/models/noteModel';
import { Dictionary } from 'src/app/util/dictionary'
import { notesReducer } from './notesReducer';
import { searchSettingsReducer } from './searchSettingsReducer';
import { categoriesReducer } from './categoriesReducer';
import { NotificationModel } from 'src/app/models/notificationModel';
import { notificationsReducer } from './notifiactionReducer';

/**
 * Interface defining the state of the application 
 */
export interface IApplicationState 
{
    searchSettings: Dictionary<string>;
    notes: NoteDisplayModel[],
    notifications: NotificationModel[],
    categoryInformation: SelectableList<CategoryDisplayModel>
}

/**
 * Combination of the existing reducer functions 
 */
export const reducers = {
    searchSettings: searchSettingsReducer,
    notes: notesReducer,
    categoryInformation: categoriesReducer,
    notifications: notificationsReducer
}

/**
 * Returns the existing notes of the current state 
 */
export const getNotes = (state: IApplicationState) => state.notes;

/**
 * Returns a specific note of the current state specified by its id
 */
export const getNote = (state: IApplicationState, id: string) => state.notes.find(note => note.id == id);

/**
 * Returns the search text for a specific field
 */
export const getSearchText = (fieldName: string, state: IApplicationState) => 
{         
    if (state.searchSettings == null || !state.searchSettings.containsKey(fieldName)) 
        return null;
    return state.searchSettings[fieldName];
}

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