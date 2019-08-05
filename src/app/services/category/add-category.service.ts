import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { Store } from '@ngrx/store';
import { IServiceBase } from '../base/iServiceBase';
import { CategoryAction } from 'src/app/redux/actions/category/categoryAction';
import { CategoryActionKind } from 'src/app/redux/actions/category/categoryActionKind';
import { CategoryModel } from 'src/app/models/categories/categoryModel';
import { IApplicationState } from 'src/app/redux/state';

/**
 * Service for adding a new category
 */
@Injectable({
  providedIn: 'root'
})
export class AddCategoryService implements IServiceBase<CategoryModel>
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
    let model = new CategoryModel(uuid());
    model.isEditing = true;
    this.store.dispatch(new CategoryAction(CategoryActionKind.CategoryAdd, model)); 
  }
}