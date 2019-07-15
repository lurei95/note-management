import { SearchTextChangeAction } from '../../redux/actions/search-text';
import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { IApplicationState, getSearchText } from 'src/app/redux/reducers';
import { Observable } from 'rxjs';

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

  private searchText: string;

  constructor(public store: Store<IApplicationState>) {
    store.select(state => getSearchText(this.fieldName, state)).subscribe((x: string) => this.searchText = x);
  }

  ngOnInit() { }

  onSearchTextChange(searchText: string) {
    console.log("searchTextChanged");
    this.store.dispatch(new SearchTextChangeAction(searchText, this.fieldName));
  }
}
