import { ActionBase } from '../actionBase';
import { OtherActionKind } from './otherActionKind';

/**
 * Title change action
 */
export class TitleChangeAction extends ActionBase<string>
{
  /**
   * Constructor
   * 
   * @param {string} payload The new title
   */
  constructor(payload: string) { super(OtherActionKind.TitleChange, payload); }
}