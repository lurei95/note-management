import { Injectable } from '@angular/core';
import { IServiceBase } from '../base/iServiceBase';
import { Store } from '@ngrx/store';
import { CategoriesRetrievedAction } from 'src/app/redux/actions/category/categoriesRetrievedAction';
import { CategoryAction } from 'src/app/redux/actions/category/categoryAction';
import { CategoryActionKind } from 'src/app/redux/actions/category/categoryActionKind';
import { IApplicationState } from 'src/app/redux/state';
import { CategoryModel } from 'src/app/models/categories/categoryModel';

/**
 * Service for retrieving all exisiting categories
 */
@Injectable({
  providedIn: 'root'
})
export class RetrieveCategoriesService implements IServiceBase 
{
  /**
   * Constructor
   * 
   * @param {Store<IApplicationState>} store Injected: redux store
   */
  constructor(private store: Store<IApplicationState>) { }

  /**
   * Executes the service: Retrieves all exisiting categories
   */
  execute()
  {
    let categories = [new CategoryModel("1522BA08-C407-458A-9E93-ED94CD8DBF1B", "Allgemeines")];
    this.store.dispatch(new CategoriesRetrievedAction(categories));
    this.store.dispatch(new CategoryAction(CategoryActionKind.SelectedCategoryChange, categories[0]));
  }
}