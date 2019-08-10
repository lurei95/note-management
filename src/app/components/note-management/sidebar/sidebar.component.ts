import { NewCategoryChangeAction } from './../../../redux/actions/category/newCategoryChangeAction';
import { CategoriesService } from './../../../services/category/categories.service';
import { FilterCategoriesService } from '../../../services/category/filter-categories.service';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { CategoryModel } from 'src/app/models/categories/categoryModel';
import { IApplicationState, getSelectedCategory, getInvalidCategoryId, getInvalidNoteId, getNewCategoryId } from 'src/app/redux/state';
import { v4 as uuid } from 'uuid';
import { SelectedCategoryChangeAction } from 'src/app/redux/actions/category/selectedCategoryChangeAction';
import { TitleChangeAction } from 'src/app/redux/actions/other/titleChangeAction';
import { MessageKind } from 'src/app/messageKind';
import { LocalizationService } from 'src/app/services/localization.service';

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
  private newCategoryId: string = null;

  private _filteredCategories: CategoryModel[] = [];
  /**
   * @returns {CategoryModel[]} A list of categories filtered by the search text
   */
  get filteredCategories(): CategoryModel[] { return this._filteredCategories; }

  /**
   * Constructor
   * 
   * @param {Store<IApplicationState>} store Injected: redux store
   * @param {LocalizationService} localizationService Injected: service for getting localized strings
   * @param {FilterCategoriesService} filterService Injected: service for filtering the categories
   * @param {CategoriesService} categoriesService Injected: service for providing the categories
   */
  constructor(private store: Store<IApplicationState>, 
    private localizationService: LocalizationService,
    private filterService: FilterCategoriesService, categoriesService: CategoriesService) 
  {
    this.store.select(getInvalidCategoryId).subscribe((x: string) => this.invalidCategoryId = x);
    this.store.select(getInvalidNoteId).subscribe((x: string) => this.invalidNoteId = x);
    this.store.select(getSelectedCategory).subscribe(
      (x: CategoryModel) => this.handleSelectedCategoryChanged(x));
    this.store.select(getNewCategoryId).subscribe((x: string) => this.handleNewCategoryChanged(x));

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
      this.newCategoryId = model.id;
      this.store.dispatch(new NewCategoryChangeAction(model.id));
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

  private handleSelectedCategoryChanged(category: CategoryModel)
  {
    let newTitle: string = null;
    if (category != null)
      newTitle = this.localizationService.execute(MessageKind.CategoryTitle, 
        { title: category == null ? null : category.title });
    this.store.dispatch(new TitleChangeAction(newTitle));
    this.selectedCategory = category;
  }

  private handleNewCategoryChanged(categoryId: string)
  {
    if (this.newCategoryId != null && this.newCategoryId != categoryId)
    {
      let index = this.filteredCategories.findIndex(item => item.id == this.newCategoryId);
      this.filteredCategories.splice(index);
    }
    this.newCategoryId = categoryId;
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