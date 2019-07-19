export interface IServiceBase<TParameter = void, TResult = void>
{
    execute(parameter: TParameter): TResult;
}