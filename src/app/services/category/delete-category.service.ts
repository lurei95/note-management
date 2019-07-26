import { CategoryValidityChangeAction } from './../../redux/actions/category/categoryValidityChangeAction';
import { NotificationService } from './../notification/notificationService';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { truncate } from 'src/app/util/utility';
import { IDeleteService } from '../base/iDeleteService';
import { NotesOfCategoryDeleteAction } from 'src/app/redux/actions/note/notesOfCategoryDeleteAction';
import { CategoryAction } from 'src/app/redux/actions/category/categoryAction';
import { CategoryActionKind } from 'src/app/redux/actions/category/categoryActionKind';
import { CategoryModel } from 'src/app/models/categoryModel';
import { IApplicationState, getInvalidCategoryId } from 'src/app/redux/state';
import { LocalizationArgument, LocalizationService } from '../localization.service';
import { MessageKind } from 'src/app/messageKind';

/**
 * Service for deleting a category
 */
@Injectable({
  providedIn: 'root'
})
export class DeleteCategoryService implements IDeleteService<CategoryModel>
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
   * Executes the service: deletes the category
   * 
   * @param {CategoryModel} parameter Category to delete
   */
  execute(parameter: CategoryModel)
  {
    this.store.dispatch(new NotesOfCategoryDeleteAction(parameter.id));
    this.store.dispatch(new CategoryAction(CategoryActionKind.CategoryDelete, parameter));
    this.unsetInvalidCategory(parameter.id);

    let argument = new LocalizationArgument(MessageKind.DeleteCategoryMessage, 
      { title: truncate(parameter.title, 10)});
    const message = this.localizationService.execute(argument);
    this.notificationService.notifySuccessMessage(message);
  }

  private unsetInvalidCategory(categoryId: string)
  {
    let invalidCategoryId: string;
    this.store.select(getInvalidCategoryId).subscribe((x: string) => invalidCategoryId = x);
    if (invalidCategoryId == categoryId)
      this.store.dispatch(new CategoryValidityChangeAction(null));
  }
}