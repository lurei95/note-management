import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

/**
 * Mock service for {@link TranslateService}
 */
export class TranslateServiceMock extends TranslateService 
{
  /**
   * Key passed to the service
   */
  key: string | string[];
  /**
   * Interpolate parameters passed to the service
   */
  interpolateParams: Object;
  /**
   * The value the service should return
   */
  returnValue: string;

  /**
   * Constructors
   */
  constructor() { super(null, null, null, null, null); }
  
  /**
   * Overwritten get method
   * 
   * @param {key} Key Key passed to the service
   * @param {Object} interpolateParams Interpolate parameters passed to the service
   * @returns {Observable<Any>} The value the service should return
   */
  get(key: string | string[], interpolateParams?: Object): Observable<any>
  { 
    this.key = key;
    this.interpolateParams = interpolateParams;
    return of(this.returnValue); 
  }
}