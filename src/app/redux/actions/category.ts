import { Action } from '@ngrx/store'
import { CategoryDisplayModel } from 'src/app/models/categoryModel';

export enum CategoryActionKind 
{
    CategoryDelete = 'CategoryDelete',
    CategoryAdd = 'CategoryAdd',
    CategoryUpdate = 'CategoryUpdate',
    CategoriesRetrieved = 'CategoriesRetrieved',
    SelectedCategoryChange = 'SelectedCategoryChanged'
}

export class CategoryAction implements Action 
{
    type: string;

    constructor(actionKind: CategoryActionKind, public payload: CategoryDisplayModel) 
    { this.type = actionKind; }
}

export class CategoriesRetrievedAction implements Action 
{
    type = CategoryActionKind.CategoriesRetrieved

    constructor(public payload: CategoryDisplayModel[]) { }
}