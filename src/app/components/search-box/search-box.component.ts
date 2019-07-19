import { SearchTextChangeAction } from '../../redux/actions/search-text';
import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { IApplicationState, getSearchText } from 'src/app/redux/reducers';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  private _fieldName: string;
  get fieldName() { return this._fieldName; }
  @Input()
  set fieldName(value: string) { this._fieldName = value; }

  private _searchText: string;
  get searchText() { return this._searchText; }
  set searchText(value: string) { this._searchText = value; }

  constructor(public store: Store<IApplicationState>) 
  { 
    store.select(state => getSearchText(this.fieldName, state)).subscribe(
      (x: string) => this.searchText = x);
  }

  ngOnInit() { }

  onSearchTextChange(searchText: string) 
  { this.store.dispatch(new SearchTextChangeAction(searchText, this.fieldName)); }
}
