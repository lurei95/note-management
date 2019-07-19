import { CategoryActionKind, CategoryAction } from './../../redux/actions/category';
import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { IApplicationState } from 'src/app/redux/reducers';
import { Store } from '@ngrx/store';
import { CategoryDisplayModel } from 'src/app/models/categoryModel';
import { IServiceBase } from '../service';

@Injectable({
  providedIn: 'root'
})
export class AddCategoryService implements IServiceBase<CategoryDisplayModel>
{
  constructor(private store: Store<IApplicationState>) { }

  execute()
  { 
    let model = new CategoryDisplayModel(uuid());
    model.isEditing = true;
    this.store.dispatch(new CategoryAction(CategoryActionKind.CategoryAdd, model)); 
  }
}