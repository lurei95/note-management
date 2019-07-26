import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { IServiceBase } from './base/iServiceBase';

/**
 * Service for retrieving a localized string
 */
@Injectable({
  providedIn: 'root'
})
export class LocalizationService implements IServiceBase<LocalizationArgument, string>
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
   * @param {LocalizationArgument} parameter Parameter with name of the string and interpolate parameters
   * @returns {string} The localized string
   */
  execute(parameter: LocalizationArgument): string 
  {
    let result: string;
    if (parameter.parameter == null)
      this.translationService.get(parameter.name).subscribe((x: string) => result = x);
    else
      this.translationService.get(parameter.name, parameter.parameter)
        .subscribe((x: string) => result = x);
    return result;
  }
}

/**
 * Argument for retrieving a localized string
 */
export class LocalizationArgument
{
  /**
   * @returns {string} Name of the string to retrieve
   */
  get name(): string { return this._name; }

  /**
   * @returns {Object} Interpolate parameters
   */
  get parameter(): Object { return this._parameter; }

  /**
   * Constructor
   * 
   * @param {string} _name Name of the string to retrieve
   * @param {Object} _parameter Interpolate parameters
   */
  constructor(private _name: string, private _parameter?: Object) { }
}