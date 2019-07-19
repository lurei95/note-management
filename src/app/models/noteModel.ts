import { IEditableModel } from './iEditableModel';
import { nullOrEmpty } from '../util/utility';

export class NoteModel 
{
    get id() { return this._id; }

    get categoryId() { return this._categoryId; }
    set categoryId(value : string) { this._categoryId = value; }

    get title() { return this._title; }
    set title(value: string) { this._title = value; }

    get text() { return this._text; }
    set text(value: string) { this._text = value; }

    get dueDate() { return this._dueDate; }
    set dueDate(value: Date) { this._dueDate = value; }

    constructor(private _id?: string, private _title?: string, private _text?: string, private _categoryId?: string, private _dueDate?: Date) {}

    asDisplayModel(): NoteDisplayModel
    { return new NoteDisplayModel(this.id, this.title, this.text, this.categoryId, this.dueDate); }
}

export class NoteDisplayModel extends NoteModel implements IEditableModel
{
    private _isEditing: boolean;
    get isEditing() { return this._isEditing; }
    set isEditing(value: boolean) { this._isEditing = value; }   

    isValid() { return !nullOrEmpty(this.title); }
}