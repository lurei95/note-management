import { FilterCategoriesService } from '../../../services/category/filter-categories.service';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { AddCategoryService } from 'src/app/services/category/add-category.service';
import { CategoryModel } from 'src/app/models/categories/categoryModel';
import { IApplicationState, getCategories, getSelectedCatgeory, getInvalidCategoryId, getInvalidNoteId } from 'src/app/redux/state';

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
  private filterText: string;
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
   * @param {FilterCategoriesService} filterService Injected: service for filtering the categories
   */
  constructor(private addService: AddCategoryService, private store: Store<IApplicationState>, 
    private filterService: FilterCategoriesService) 
  {
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
  handleAddButtonClicked() 
  { 
    if (this.invalidCategoryId == null && this.invalidNoteId == null)
      this.addService.execute(); 
  }

  /**
   * Event handler: filters the categories
   */
  handleFilterTextChanged(filterText: string)
  {
    if (this.filterText != filterText)
    {
      this.filterText = filterText;
      this.filterCategories(); 
    }
  }

  private handleCategoriesChanged(categories: CategoryModel[]) 
  {
    this.categories = categories;
    this.filterCategories(); 
  }

  private filterCategories() 
  {
    this._filteredCategories = this.filterService.filter(this.categories, this.filterText, 
      this.selectedCategory == null ? null : this.selectedCategory.id).slice(0, 19);
  }
}