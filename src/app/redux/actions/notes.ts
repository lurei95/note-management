import { Action } from '@ngrx/store'
import { NoteDisplayModel } from 'src/app/models/noteModel';

export enum NoteActionKind 
{
    NoteDelete = 'NoteDelete',
    NoteAdd = 'NoteAdd',
    NotesRetrieved = 'NotesRetrieved',
    NoteUpdate = 'NoteUpdate'
}

export class NoteAction implements Action 
{
    type: string;

    constructor(actionKind: NoteActionKind, public payload: NoteDisplayModel) { this.type = actionKind; }
}

export class NotesRetrievedAction implements Action 
{
    type = NoteActionKind.NotesRetrieved

    constructor(public payload: NoteDisplayModel[]) { }
}