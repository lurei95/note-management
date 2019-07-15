import * as fromSearchText from './search-text'
import * as fromNotes from './notes'
import { NoteModel } from 'src/app/models/noteModel';
import { Dictionary } from 'src/app/util/dictionary'

export interface IApplicationState {
    searchSettings: Dictionary<string>
    notes: NoteModel[]
}

export const reducers = {
    searchSettings: fromSearchText.reducer,
    notes: fromNotes.reducer
}

export const getNotes = (state: IApplicationState) => state.notes;
export const getSearchText = (fieldName: string, state: IApplicationState) => {         
    if (state.searchSettings == null || !state.searchSettings.containsKey(fieldName)) 
        return null;
    return state.searchSettings[fieldName];
}