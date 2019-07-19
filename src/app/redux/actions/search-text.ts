import { Action } from '@ngrx/store'

export const SEARCH_TEXT_CHANGE = '[SearchText] Change - '

export class SearchTextChangeAction implements Action 
{
    type = SEARCH_TEXT_CHANGE;

    constructor(public payload: string, public fieldName: string) {}
}