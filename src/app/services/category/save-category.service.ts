import { IApplicationState } from '../../redux/reducers/index';
import { Injectable } from '@angular/core';
import { CategoryDisplayModel } from 'src/app/models/categoryModel';
import { Store } from '@ngrx/store';
import { CategoryActionKind, CategoryAction } from 'src/app/redux/actions/category';
import { truncate } from 'src/app/util/utility';
import { NotificationService } from '../notification/notificationService';
import { ISaveService } from '../base/iSaveService';

/**
 * Service for saving changes to a category
 */
@Injectable({
  providedIn: 'root'
})
export class SaveCategoryService implements ISaveService<CategoryDisplayModel>
{
  /**
   * Constructor
   * 
   * @param {Store<IApplicationState>} store Injected: redux store
   * @param {NotificationService} notificationService Injected: service for displaying notifications
   */
  constructor(private store: Store<IApplicationState>, 
    private notificationService: NotificationService) 
  { }
  
  /**
   * Executes the service: Saves the category
   * 
   * @param {CategoryDisplayModel} parameter Category to save
   */
  execute(parameter: CategoryDisplayModel)
  {
    parameter.isEditing = false;
    this.store.dispatch(new CategoryAction(CategoryActionKind.CategoryUpdate, parameter));

    const message = 'Kategorie "' + truncate(parameter.title, 10) + '" erfolgreich gespeichert'
    this.notificationService.notifySuccessMessage(message);
  }
}