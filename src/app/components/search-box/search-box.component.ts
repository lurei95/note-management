import { SearchTextChangeAction } from '../../redux/actions/search-text';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IApplicationState } from 'src/app/redux/reducers';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  constructor(public store: Store<IApplicationState>) {}

  ngOnInit() { }

  onSearchTextChange(searchText: string) {
    this.store.dispatch(new SearchTextChangeAction(searchText));
  }
}
