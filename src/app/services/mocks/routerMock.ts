import { UrlTree, NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';

/**
 * Mock for the angular router
 */
export class RouterMock
{
  /**
   * Passed url parameter
   */
  urlParameter: string | UrlTree;

  /**
   * Navigates the specified url
   * 
   * @param {string | UrlTree} url Url
   * @param {NavigationExtras} extras
   */
  navigateByUrl(url: string | UrlTree, extras?: NavigationExtras) 
  {
    this.urlParameter = url;
    return new Promise<boolean>((resolve) => resolve(true));
  }
}