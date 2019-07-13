import * as fromSeachText from './search-text'

export interface IApplicationState {
    searchText: string
}

export const reducers = {
    searchText: fromSeachText.reducer
}