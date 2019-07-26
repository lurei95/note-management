export abstract class ActionBase<T>
{
  /**
   * Type of the action
   */
  type: string;

  /**
   * Constructor
   * 
   * @param {string} actionKind Type of the action
   * @param {T} payload The payload of the action
   */
  constructor(actionKind: string, public payload: T)  { this.type = actionKind; }
}