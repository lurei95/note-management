import * as searchText from '../actions/search-text'
import { Dictionary } from 'src/app/util/dictionary';

/**
 * Reducer-function for changing the state of the search settings
 * 
 * @param {Dictionary<string>} state The current state
 * @param {Action} The action which changes the state
 */
export function searchSettingsReducer(state: Dictionary<string> = new Dictionary<string>(), 
  action: searchText.SearchTextChangeAction) 
{
  switch (action.type)
  {
    case searchText.SEARCH_TEXT_CHANGE:
      let newState = new Dictionary<string>();
      if (newState.containsKey(action.fieldName))
        newState[action.fieldName] = action.payload;
      else
        newState.add(action.fieldName, action.payload);
      return newState;
    default:
      return state
  }
}