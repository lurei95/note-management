import { ValidateCategoryService } from './../../services/category/validate-category.service';
import { FilterCategoriesService } from './../../services/category/filter-categories.service';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { AddCategoryService } from 'src/app/services/category/add-category.service';
import { CategoryModel } from 'src/app/models/categoryModel';
import { IApplicationState, getSearchText, getCategories, getSelectedCatgeory, getInvalidCategoryId, getInvalidNoteId } from 'src/app/redux/state';

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
  private categories: CategoryModel[];
  private searchText: string;
  private selectedCategory: CategoryModel;
  private invalidCategoryId: string;
  private invalidNoteId: string;

  private _filteredCategories: CategoryModel[];
  /**
   * @returns {CategoryModel[]} A list of categories filtered by the search text
   */
  get filteredCategories(): CategoryModel[] { return this._filteredCategories; }

  /**
   * Constructor
   * 
   * @param {AddCategoryService} addService Injected: service for adding a new category
   * @param {Store<IApplicationState>} store Injected: redux store
   * @param {FilterCategoriesService} store Injected: service for filtering the categories
   * @param {ValidateCategoryService} validationService Injected: service for validating the category
   */
  constructor(private addService: AddCategoryService, private store: Store<IApplicationState>, 
    private filterService: FilterCategoriesService, private validationService: ValidateCategoryService) 
  {
    this.store.select(state => getSearchText("Category", state)).subscribe(
      (x: string) => this.handleSearchTextChanged(x));
    this.store.select(getInvalidCategoryId).subscribe((x: string) => this.invalidCategoryId = x);
    this.store.select(getInvalidNoteId).subscribe((x: string) => this.invalidNoteId = x);
    this.store.select(getCategories).subscribe(
      (x: CategoryModel[]) => this.handleCategoriesChanged(x));
    this.store.select(getSelectedCatgeory).subscribe(
      (x: CategoryModel) => this.selectedCategory = x);
  }

  /**
   * Event handler: adds a new category
   */
  onAddButtonClicked() 
  { 
    if (this.invalidCategoryId == null && this.invalidNoteId == null)
      this.addService.execute(); 
  }

  private handleCategoriesChanged(categories: CategoryModel[]) 
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
      this.selectedCategory == null ? null : this.selectedCategory.id).slice(0, 19);
  }
}