import { NotificationActionKind } from './notificationActionKind';
import { NotificationModel } from 'src/app/models/notifications/notificationModel';
import { ActionBase } from '../actionBase';

/**
 * Action performed on the state related to {@link NotificationModel}
 */
export class NotificationAction extends ActionBase<NotificationModel>
{
  /**
   * Constructor
   * 
   * @param {NotificationActionKind} actionKind Type of the action
   * @param {NotificationModel} payload The notification involved in the action
   */
  constructor(actionKind: NotificationActionKind, public payload: NotificationModel) 
  { super(actionKind, payload); }
}