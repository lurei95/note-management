import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';

/**
 * Service for retrieving a localized string
 */
@Injectable({
  providedIn: 'root'
})
export class LocalizationService
{
  /**
   * Constructor
   * 
   * @param {TranslateService} translationService Injected: service for providing translations
   */
  constructor(private translationService: TranslateService) { }

  /**
   * Executes the service: returns the localized string
   * 
   * @param {string} name Name of the string to retrieve
   * @param {Object} parameter Interpolate parameters
   * @returns {string} The localized string
   */
  execute(name: string, parameter?: Object): string 
  {
    let result: string;
    if (parameter == null)
      this.translationService.get(name).subscribe((x: string) => result = x);
    else
      this.translationService.get(name, parameter).subscribe((x: string) => result = x);
    return result;
  }
}