import { FilterCategoriesService } from './../../services/category/filter-categories.service';
import { getCategories, getSelectedCatgeory, IApplicationState, getSearchText } from './../../redux/reducers/index';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { CategoryDisplayModel } from 'src/app/models/categoryModel';
import { AddCategoryService } from 'src/app/services/category/add-category.service';

/**
 * Component for a sidbar containing categories
 */
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent
{
  private categories: CategoryDisplayModel[];
  private searchText: string;
  private selectedCategory: CategoryDisplayModel;

  private _filteredCategories: CategoryDisplayModel[];
  /**
   * @returns {CategoryDisplayModel[]} A list of categories filtered by the search text
   */
  get filteredCategories(): CategoryDisplayModel[] { return this._filteredCategories; }

  /**
   * Constructor
   * 
   * @param {AddCategoryService} addService Injected: service for adding a new category
   * @param {Store<IApplicationState>} store Injected: redux store
   * @param {FilterCategoriesService} store Injected: service for filtering the categories
   */
  constructor(private addService: AddCategoryService, private store: Store<IApplicationState>, 
    private filterService: FilterCategoriesService) 
  {
    this.store.select(state => getSearchText("Category", state)).subscribe(
      (x: string) => this.handleSearchTextChanged(x));
    this.store.select(getCategories).subscribe(
      (x: CategoryDisplayModel[]) => this.handleCategoriesChanged(x));
    this.store.select(getSelectedCatgeory).subscribe(
      (x: CategoryDisplayModel) => this.selectedCategory = x);
  }

  /**
   * Event handler: adds a new category
   */
  onAddButtonClicked() 
  { 
    let selectedCategory = this.categories.filter(category => category.isEditing)[0];
    if (selectedCategory == null || selectedCategory.isValid())
      this.addService.execute(); 
  }

  private handleCategoriesChanged(categories: CategoryDisplayModel[]) 
  {
    this.categories = categories;
    this.filterCategories(); 
  }

  private handleSearchTextChanged(searchText: string)
  {
    if (this.searchText != searchText)
    {
      this.searchText = searchText;
      this.filterCategories(); 
    }
  }

  private filterCategories() 
  {
    this._filteredCategories = this.filterService.filter(this.categories, this.searchText, 
      this.selectedCategory.id);
  }
}