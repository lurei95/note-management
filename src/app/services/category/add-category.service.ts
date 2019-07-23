import { CategoryActionKind, CategoryAction } from './../../redux/actions/category';
import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { IApplicationState } from 'src/app/redux/reducers';
import { Store } from '@ngrx/store';
import { CategoryDisplayModel } from 'src/app/models/categoryModel';
import { IServiceBase } from '../base/iServiceBase';

/**
 * Service for adding a new category
 */
@Injectable({
  providedIn: 'root'
})
export class AddCategoryService implements IServiceBase<CategoryDisplayModel>
{
  /**
   * Constructor
   * 
   * @param {Store<IApplicationState>} store Injected: redux store
   */
  constructor(private store: Store<IApplicationState>) { }

  /**
   * Executes the service: Adds a new category
   */
  execute()
  { 
    let model = new CategoryDisplayModel(uuid());
    model.isEditing = true;
    this.store.dispatch(new CategoryAction(CategoryActionKind.CategoryAdd, model)); 
  }
}