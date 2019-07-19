import { getCategories, getSelectedCatgeory } from './../../redux/reducers/index';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { IApplicationState, getSearchText } from 'src/app/redux/reducers';
import { CategoryModel, CategoryDisplayModel } from 'src/app/models/categoryModel';
import { AddCategoryService } from 'src/app/services/category/add-category.service';
import { nullOrEmpty } from 'src/app/util/utility';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit 
{
  private categories: CategoryDisplayModel[];
  private searchText: string;

  private _filteredCategories: CategoryDisplayModel[];
  get filteredCategories() { return this._filteredCategories; }

  constructor(private addService: AddCategoryService, private store: Store<IApplicationState>) 
  {
    this.store.select(state => getSearchText("Category", state)).subscribe(
      (x: string) => this.handleSearchTextChanged(x));
    this.store.select(getCategories).subscribe(
      (x: CategoryDisplayModel[]) => this.handleCategoriesChanged(x));
  }

  private handleCategoriesChanged(categories: CategoryDisplayModel[]) 
  {
    this.categories = categories;
    this.filterCategories(categories); 
  }

  private handleSearchTextChanged(searchText: string)
  {
    if (this.searchText != searchText)
    {
      this.searchText = searchText;
      this.filterCategories(this.categories); 
    }
  }

  private filterCategories(categories: CategoryDisplayModel[]) 
  {
    if (!nullOrEmpty(this.searchText))
      this._filteredCategories = categories.filter(
        note => note.title.toUpperCase().includes(this.searchText.toUpperCase())
      );
    else
      this._filteredCategories = categories
  }

  ngOnInit() { }

  onAddButtonClicked() 
  { 
    let selectedCategory = this.categories.filter(category => category.isEditing)[0];
    if (selectedCategory == null || selectedCategory.isValid())
      this.addService.execute(); 
  }
}