/**
 * Interface of a service
 */
export interface IServiceBase<TParameter = void, TResult = void>
{
  /**
   * Executes the service
   * 
   * @param {TParameter} parameter The parameter
   */
  execute(parameter: TParameter): TResult;
}