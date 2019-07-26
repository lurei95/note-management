import { CategoryModel } from './../../models/categoryModel';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { truncate } from 'src/app/util/utility';
import { NotificationService } from '../notification/notificationService';
import { ISaveService } from '../base/iSaveService';
import { CategoryAction } from 'src/app/redux/actions/category/categoryAction';
import { CategoryActionKind } from 'src/app/redux/actions/category/categoryActionKind';
import { IApplicationState } from 'src/app/redux/state';
import { LocalizationArgument, LocalizationService } from '../localization.service';
import { MessageKind } from 'src/app/messageKind';

/**
 * Service for saving changes to a category
 */
@Injectable({
  providedIn: 'root'
})
export class SaveCategoryService implements ISaveService<CategoryModel>
{
  /**
   * Constructor
   * 
   * @param {Store<IApplicationState>} store Injected: redux store
   * @param {NotificationService} notificationService Injected: service for displaying notifications
   * @param {LocalizationService} localizationService Injected: service for getting localized strings
   */
  constructor(private store: Store<IApplicationState>,
    private notificationService: NotificationService, 
    private localizationService: LocalizationService) 
  { }
  
  /**
   * Executes the service: Saves the category
   * 
   * @param {CategoryModel} parameter Category to save
   */
  execute(parameter: CategoryModel)
  {
    parameter.isEditing = false;
    this.store.dispatch(new CategoryAction(CategoryActionKind.CategoryUpdate, parameter));

    let argument = new LocalizationArgument(MessageKind.SaveCategoryMessage, 
      { title: truncate(parameter.title, 10)});
    const message = this.localizationService.execute(argument);
    this.notificationService.notifySuccessMessage(message);
  }
}