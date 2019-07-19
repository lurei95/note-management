import { CategoryActionKind } from './../../redux/actions/category';
import { CategoryAction } from '../../redux/actions/category';
import { Injectable } from '@angular/core';
import { IApplicationState } from 'src/app/redux/reducers';
import { IServiceBase } from '../service';
import { CategoryDisplayModel } from 'src/app/models/categoryModel';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class DeleteCategoryService implements IServiceBase<CategoryDisplayModel>
{
  constructor(private store: Store<IApplicationState>) { }

  execute(parameter: CategoryDisplayModel)
  { this.store.dispatch(new CategoryAction(CategoryActionKind.CategoryDelete, parameter)); }
}
