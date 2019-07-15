import { Action } from '@ngrx/store'
import { NoteModel } from 'src/app/models/noteModel';

export const NOTE_DELETE = '[Note] Delete'
export const NOTE_ADD = '[Note] Add'
export const NOTES_RETRIEVED = '[Notes] Retrieved'

export abstract class NotesActionBase implements Action {
    abstract type: string;

    constructor(public payload: NoteModel) {}
}

export class NoteDeleteAction implements NotesActionBase {
    type = NOTE_DELETE

    constructor(public payload: NoteModel) {}
}

export class NoteAddAction implements NotesActionBase {
    type = NOTE_ADD

    constructor(public payload: NoteModel) {}
}

export class NotesRetrievedAction implements Action {
    type = NOTES_RETRIEVED

    constructor(public payload: NoteModel[]) { }
}