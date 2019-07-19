import { IEditableModel } from './iEditableModel';
import { NoteDisplayModel } from './noteModel';
import { nullOrEmpty } from '../util/utility';

export class CategoryModel 
{
    get id() { return this._id; }

    get title() { return this._title; }
    set title(value: string) { this._title = value; }

    constructor( private _id?: string, private _title? : string) { }

    asDisplayModel(): CategoryDisplayModel
    { return new CategoryDisplayModel(this.id, this.title); }
}

export class CategoryDisplayModel extends CategoryModel implements IEditableModel
{
    private _isEditing: boolean;
    get isEditing() { return this._isEditing; }
    set isEditing(value: boolean) { this._isEditing = value; }

    isValid() { return !nullOrEmpty(this.title); }
}