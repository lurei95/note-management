import { CategoriesService } from './../../../services/category/categories.service';
import { FilterCategoriesService } from '../../../services/category/filter-categories.service';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { CategoryModel } from 'src/app/models/categories/categoryModel';
import { IApplicationState, getSelectedCategory, getInvalidCategoryId, getInvalidNoteId } from 'src/app/redux/state';
import { v4 as uuid } from 'uuid';
import { SelectedCategoryChangeAction } from 'src/app/redux/actions/category/selectedCategoryChangeAction';

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
  private categories: CategoryModel[] = [];
  private filterText: string  = null;
  private selectedCategory: CategoryModel = null;
  private invalidCategoryId: string = null;
  private invalidNoteId: string = null;

  private _filteredCategories: CategoryModel[] = [];
  /**
   * @returns {CategoryModel[]} A list of categories filtered by the search text
   */
  get filteredCategories(): CategoryModel[] { return this._filteredCategories; }

  /**
   * Constructor
   * 
   * @param {Store<IApplicationState>} store Injected: redux store
   * @param {FilterCategoriesService} filterService Injected: service for filtering the categories
   * @param {CategoriesService} categoriesService Injected: service for providing the categories
   */
  constructor(private store: Store<IApplicationState>, 
    private filterService: FilterCategoriesService, categoriesService: CategoriesService) 
  {
    this.store.select(getInvalidCategoryId).subscribe((x: string) => this.invalidCategoryId = x);
    this.store.select(getInvalidNoteId).subscribe((x: string) => this.invalidNoteId = x);
    this.store.select(getSelectedCategory).subscribe(
      (x: CategoryModel) => this.selectedCategory = x);

    categoriesService.get((x: CategoryModel[]) => this.handleCategoriesChanged(x));
  }

  /**
   * Event handler: adds a new category
   */
  handleAddButtonClicked() 
  { 
    if (this.invalidCategoryId == null && this.invalidNoteId == null)
    {
      let model = new CategoryModel(uuid());
      model.isEditing = true;
      this._filteredCategories.push(model);
    }     
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
    this.categories = categories.sort((a, b) => a.timestamp - b.timestamp);
    if (categories.length > 0 && this.selectedCategory == null)
      this.store.dispatch(new SelectedCategoryChangeAction(categories[0]));
    this.filterCategories(); 
  }

  private filterCategories() 
  {
    let result = this.filterService.filter(this.categories, this.filterText, 
      this.selectedCategory == null ? null : this.selectedCategory.id);
    if (result != null)
      this._filteredCategories = result.slice(0, 19);
    else
      this._filteredCategories = [];
  }
}