import { CategoryDisplayModel } from '../../models/categoryModel';
import { NoteDisplayModel } from 'src/app/models/noteModel';
import { Dictionary } from 'src/app/util/dictionary'
import { notesReducer } from './notesReducer';
import { searchSettingsReducer } from './searchSettingsReducer';
import { categoriesReducer } from './categoriesReducer';
import { selectedCategoryReducer } from './selectedCategoryReducer';

export interface IApplicationState 
{
    searchSettings: Dictionary<string>;
    notes: NoteDisplayModel[];
    categories: CategoryDisplayModel[];
    selectedCategory: CategoryDisplayModel
}

export const reducers = {
    searchSettings: searchSettingsReducer,
    notes: notesReducer,
    categories: categoriesReducer,
    selectedCategory: selectedCategoryReducer
}

export const getNotes = (state: IApplicationState) => state.notes;

export const getSearchText = (fieldName: string, state: IApplicationState) => 
{         
    if (state.searchSettings == null || !state.searchSettings.containsKey(fieldName)) 
        return null;
    return state.searchSettings[fieldName];
}

export const getCategories = (state: IApplicationState) => state.categories;

export const getSelectedCatgeory = (state: IApplicationState) => state.selectedCategory;