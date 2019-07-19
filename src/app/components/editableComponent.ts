import { IEditableModel } from '../models/iEditableModel';

export abstract class EditableComponent<TEditable extends IEditableModel>
{
    protected model: TEditable

    constructor() { }

    validateModel(): boolean { return this.model.isValid(); }
}