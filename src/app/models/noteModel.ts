export class NoteModel {
    
    get title() { return this._title; }
    set title(value: string) { this._title = value; }

    get text() { return this._text; }
    set text(value: string) { this._text = value; }

    get dueDate() { return this._dueDate; }
    set dueDate(value: Date) { this._dueDate = value; }

    constructor(private _title?: string, private _text?: string, private _dueDate?: Date) {}
}