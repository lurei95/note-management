import { NotificationModel } from 'src/app/models/notificationModel';
import { Action } from '@ngrx/store';

/**
 * Kind of action performed on the state related to {@link NotificationModel}
 */
export enum NotificationActionKind 
{
  /**
   * Notification is added
   */
  NotificationAdd = 'NotificationAdd',
  /**
   * Notification is removed
   */
  NotificationRemove = 'NotificationRemove'
}

/**
 * Action performed on the state related to {@link NotificationModel}
 */
export class NotificationAction implements Action 
{
  /**
   * Type of the action
   */
  type: string;

  /**
   * Constructor
   * 
   * @param {NotificationActionKind} actionKind Type of the action
   * @param {NotificationModel} payload The notification involved in the action
   */
  constructor(actionKind: NotificationActionKind, public payload: NotificationModel) 
  { this.type = actionKind; }
}