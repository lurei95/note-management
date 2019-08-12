import { OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';

/**
 * Baseclass for all components
 */
export abstract class ComponentBase implements OnDestroy
{
  private _unsubscribe: Subject<void> = new Subject();
  /**
   * @returns {Observable<void>} Observable to notifiy that all subscriptions to other observables can be removed
   */
  protected get unsubscribe(): Observable<void> { return this._unsubscribe; }

  /**
   * Method called when the component is destroyed
   */
  ngOnDestroy()
  {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}