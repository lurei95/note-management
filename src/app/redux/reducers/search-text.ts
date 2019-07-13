import * as searchText from '../actions/search-text'

export function reducer(state: string = "", action: searchText.SearchTextChangeAction) {
  switch (action.type) {
    case searchText.SEARCH_TEXT_CHANGE:
      return action.payload
    default:
      return state
  }
}