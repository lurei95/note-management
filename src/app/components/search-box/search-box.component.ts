import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { SearchTextChangeAction } from 'src/app/redux/actions/searchText/searchTextChangeAction';
import { IApplicationState, getSearchText } from 'src/app/redux/state';

/**
 * Component for a search box
 */
@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent
{
  private _fieldName: string;
  /**
   * @returns {string} Field name used for the search settings see {@info SearchTextChangeAction} 
   */
  get fieldName(): string { return this._fieldName; }
  /**
   * @param {string} value Field name used for the search settings see {@info SearchTextChangeAction} 
   */
  @Input()
  set fieldName(value: string) { this._fieldName = value; }

  private _searchText: string;
  /**
   * @returns {string} The search text
   */
  get searchText(): string { return this._searchText; }
  /**
   * @param {string} value The search text
   */
  set searchText(value: string) { this._searchText = value; }

  /**
   * Constructor
   * 
   * @param {Store<IApplicationState>} store Injected: redux store
   */
  constructor(public store: Store<IApplicationState>) 
  { 
    store.select(state => getSearchText(this.fieldName, state)).subscribe(
      (x: string) => this.searchText = x);
  }

  /**
   * Event handler: changes the search text in the search settings
   * 
   * @param {string} searchText The new search text
   */
  onSearchTextChange(searchText: string) 
  { this.store.dispatch(new SearchTextChangeAction(searchText, this.fieldName)); }
}
