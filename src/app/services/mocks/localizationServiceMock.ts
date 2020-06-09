import { LocalizationService } from '../../services/localization.service';

/**
 * Mock service for {@link LocalizationService}
 */
export class LocalizationServiceMock extends LocalizationService
{
  /**
   * Name passed to the service
   */
  names: string[] = [];
  /**
   * Interpolate parameters passed to the service
   */
  parameters: Object[] = [];
  /**
   * The value the service should return
   */
  returnValue: string;

  /**
   * Constructor
   */
  constructor() { super(null); }

  /**
   * Overwritten execute method
   * 
   * @param {string} name Name passed to the service
   * @param {Object} parameter Interpolate parameters passed to the service
   * @returns {string} The value the service should return
   */
  execute(name: string, parameter?: Object): string 
  {
    this.names.push(name);
    this.parameters.push(parameter);
    return this.returnValue;
  }
}