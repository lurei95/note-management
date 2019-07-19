import { Injectable } from '@angular/core';
import { IServiceBase } from '../service';
import { CategoryDisplayModel } from 'src/app/models/categoryModel';
import { Store } from '@ngrx/store';
import { IApplicationState } from 'src/app/redux/reducers';
import { CategoryActionKind, CategoryAction } from 'src/app/redux/actions/category';

@Injectable({
  providedIn: 'root'
})
export class UpdateCategoryService implements IServiceBase<CategoryDisplayModel>
{
  constructor(private store: Store<IApplicationState>) { }
  
  execute(parameter: CategoryDisplayModel)
  {
    parameter.isEditing = false;
    this.store.dispatch(new CategoryAction(CategoryActionKind.CategoryUpdate, parameter)); 
  }
}