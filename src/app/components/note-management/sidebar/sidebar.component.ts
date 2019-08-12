import { NewCategoryChangeAction } from './../../../redux/actions/category/newCategoryChangeAction';
import { CategoriesService } from './../../../services/category/categories.service';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { CategoryModel } from 'src/app/models/categories/categoryModel';
import { IApplicationState, getSelectedCategory, getInvalidCategoryId, getInvalidNoteId, getNewCategoryId } from 'src/app/redux/state';
import { v4 as uuid } from 'uuid';
import { SelectedCategoryChangeAction } from 'src/app/redux/actions/category/selectedCategoryChangeAction';
import { TitleChangeAction } from 'src/app/redux/actions/other/titleChangeAction';
import { MessageKind } from 'src/app/messageKind';
import { LocalizationService } from 'src/app/services/localization.service';
import { nullOrEmpty } from 'src/app/util/utility';
import { Observable, of, concat, merge } from 'rxjs';

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
  private filterText: string  = null;
  private selectedCategory: CategoryModel = null;
  private invalidCategoryId: string = null;
  private invalidNoteId: string = null;
  private newCategory: CategoryModel = null;

  private filterFunc = (category: CategoryModel) => 
  {
    if (!nullOrEmpty(this.filterText))
    return category.id == this.selectedCategory.id 
      || category.title.toUpperCase().includes(this.filterText.toUpperCase());
    else
      return true;
  }

  /**
   * Constructor
   * 
   * @param {Store<IApplicationState>} store Injected: redux store
   * @param {LocalizationService} localizationService Injected: service for getting localized strings
   * @param {CategoriesService} categoriesService Injected: service for providing the categories
   */
  constructor(private store: Store<IApplicationState>, 
    private localizationService: LocalizationService, 
    private categoriesService: CategoriesService) 
  {
    this.store.select(getInvalidCategoryId).subscribe((x: string) => this.invalidCategoryId = x);
    this.store.select(getInvalidNoteId).subscribe((x: string) => this.invalidNoteId = x);
    this.store.select(getSelectedCategory).subscribe(
      (x: CategoryModel) => this.handleSelectedCategoryChanged(x));
    this.store.select(getNewCategoryId).subscribe((x: string) => this.handleNewCategoryChanged(x));

    this.updateSubscription();
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
      this.newCategory = model;
      this.categories = [...this.categories, this.newCategory];
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
      this.updateSubscription();
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
    if (this.newCategory != null && categoryId == null)
    {
      this.newCategory = null;
      this.categories.splice(this.categories.length - 1, 1);
    }
  }

  private handleCategoriesChanged(categories: CategoryModel[]) 
  {
    categories = categories;
    if (categories.length > 0 && this.selectedCategory == null)
      this.store.dispatch(new SelectedCategoryChangeAction(categories[0]));
    if (this.newCategory != null)
      this.categories = [...categories, this.newCategory];
    else
      this.categories = categories;
  }

  private updateSubscription()
  { 
    this.categoriesService.get(this.filterFunc)
      .subscribe((x: CategoryModel[]) => this.handleCategoriesChanged(x));
  }
}