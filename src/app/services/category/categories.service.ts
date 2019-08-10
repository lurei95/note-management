import { LocalizationService } from './../localization.service';
import { NotificationService } from './../notification/notificationService';
import { SelectedCategoryChangeAction } from '../../redux/actions/category/selectedCategoryChangeAction';
import { CategoryValidityChangeAction } from 'src/app/redux/actions/category/categoryValidityChangeAction';
import { DatabaseService } from '../database.service';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IApplicationState, getSelectedCategory, getInvalidCategoryId } from 'src/app/redux/state';
import { CategoryModel } from 'src/app/models/categories/categoryModel';
import { ModelService } from '../base/modelService';
import { MessageKind } from 'src/app/messageKind';
import { truncate, nullOrEmpty } from 'src/app/util/utility';
import { Dictionary } from 'src/app/util/dictionary';
import { DocumentData } from '@angular/fire/firestore';
import { NewCategoryChangeAction } from 'src/app/redux/actions/category/newCategoryChangeAction';

/**
 * Service for retrieving all exisiting categories
 */
@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends ModelService<CategoryModel>
{
  /**
   * @returns {string} The path to the collection for the model type
   */
  protected get path(): string { return "categories"; }
  
  /**
   * Constructor
   * 
   * @param {Store<IApplicationState>} store Injected: redux store
   * @param {DatabaseService} databaseService Injected: service for accessing the firebase db
   * @param {NotificationService} notificationService Injected: service for displaying notfications
   * @param {LocalizationService} localizationService Injected: service for providing localized strings
   */
  constructor(store: Store<IApplicationState>, databaseService: DatabaseService, 
    private notificationService: NotificationService,
    private localizationService: LocalizationService) 
  { super(store, databaseService); }

  /**
   * Executes the service: Saves the category
   * 
   * @param {CategoryModel} parameter Category to save
   */
  save(parameter: CategoryModel)
  {
    parameter.isEditing = false;

    super.save(parameter);

    const message = this.localizationService.execute(MessageKind.SaveCategoryMessage, 
     { title: truncate(parameter.title, 10) });
    this.notificationService.notifySuccessMessage(message);
  }

  /**
   * Executes the service: deletes the category
   * 
   * @param {CategoryModel} parameter Category to delete
   */
  delete(parameter: CategoryModel)
  {
    this.unsetInvalidCategory(parameter.id);
    this.unsetSelectedCategory(parameter.id)

    if (parameter.timestamp != null)
      super.delete(parameter);
    else
      this.store.dispatch(new NewCategoryChangeAction(null));

    this.deleteNotesOfCategory(parameter.id);

    const message = this.localizationService
      .execute(MessageKind.DeleteCategoryMessage, { title: truncate(parameter.title, 10) });
    this.notificationService.notifySuccessMessage(message);
  }

  /**
   * Executes the service: Validates the category
   * 
   * @param {CategoryModel} parameter Category to validate
   * @return {Dictionary<string>} A Dictionary containing value pairs: (property name, error message)
   */
  validate(parameter: CategoryModel): Dictionary<string> 
  {
    let result = super.validate(parameter);
    if (nullOrEmpty(parameter.title))
    {
      let message = this.localizationService.execute(MessageKind.RequiredField);
      result.add("title", message);
    }
    return result;
  }

  /**
   * Maps the doucment data to the model
   * 
   * @param {DocumentData} data The data to map to the model
   * @returns {CategoryModel} The mdoel
   */
  protected map(data: DocumentData): CategoryModel
  { return Object.assign(new CategoryModel(), data) };

  private unsetInvalidCategory(categoryId: string)
  {
    this.store.select(getInvalidCategoryId).subscribe((x: string) => { 
      if (x == categoryId)
        this.store.dispatch(new CategoryValidityChangeAction(null));
    });
  }

  private deleteNotesOfCategory(categoryId: string)
  {
    let notesCollection = this.databaseService.getCollection("notes", this.userDoc);
    this.databaseService.deleteAll(notesCollection, function(doc) { 
      return this._categoryId == categoryId
    });
  }

  private unsetSelectedCategory(categoryId: string)
  {
    this.store.select(getSelectedCategory).subscribe((x: CategoryModel) => { 
      if (x != null && x.id == categoryId)
        this.store.dispatch(new SelectedCategoryChangeAction(null));
    });
  }
}