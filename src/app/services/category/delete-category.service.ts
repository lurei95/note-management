import { NotificationService } from './../notification/notificationService';
import { IApplicationState } from './../../redux/reducers/index';
import { CategoryActionKind } from './../../redux/actions/category';
import { CategoryAction } from '../../redux/actions/category';
import { Injectable } from '@angular/core';
import { IServiceBase } from '../service';
import { CategoryDisplayModel } from 'src/app/models/categoryModel';
import { Store } from '@ngrx/store';
import { NotesOfCategoryDeleteAction } from 'src/app/redux/actions/notes';
import { truncate } from 'src/app/util/utility';

/**
 * Service for deleting a category
 */
@Injectable({
  providedIn: 'root'
})
export class DeleteCategoryService implements IServiceBase<CategoryDisplayModel>
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
   * Executes the service: deletes the category
   * 
   * @param {CategoryDisplayModel} parameter Category to delete
   */
  execute(parameter: CategoryDisplayModel)
  {
    this.store.dispatch(new NotesOfCategoryDeleteAction(parameter.id));
    this.store.dispatch(new CategoryAction(CategoryActionKind.CategoryDelete, parameter));

    const message = 'Kategorie "' + truncate(parameter.title, 10) + '" erfolgreich gelöscht'
    this.notificationService.notifySuccessMessage(message);
  }
}