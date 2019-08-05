import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { IApplicationState } from 'src/app/redux/state';

/**
 * Mock service for {@link Store<T>}
 */
export class StoreMock extends Store<IApplicationState>
{
  /**
   * The dispatched action
   */
  dispatchedActions: Action[] = [];
  /**
   * The selector for the select result
   */
  resultSelector: (obj: any) => Observable<any> = () => of(null);

  /**
   * Constructor
   */
  constructor() { super(null, null, null); }

  /**
   * Dispatches an action
   * 
   * @param {Action} action The action to dispatch
   */
  public dispatch(action: Action) { this.dispatchedActions.push(action); }

  /**
   * Selects a value from the store
   * 
   * @param {any} selector The selector for the value
   * @return {Observable<any>} Result determined by the resultSelector
   */
  public select(selector: any): Observable<any> { return this.resultSelector(selector); }
}