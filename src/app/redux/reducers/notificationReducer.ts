import { NotificationModel } from '../../models/notifications/notificationModel';
import { Action } from '@ngrx/store';
import { NotificationActionKind } from '../actions/notification/notificationActionKind';
import { NotificationAction } from '../actions/notification/notificationAction';

/**
 * Reducer-function for changing the state related to {@link NotificationModel}
 * 
 * @param {NotificationModel[]} state The current state
 * @param {Action} The action which changes the state
 */
export function notificationReducer(state: NotificationModel[] = [], action: Action) 
{   
  let notification = (<NotificationAction>action).payload;

  switch (action.type) 
  {
    case NotificationActionKind.NotificationAdd:
      return [...state, notification];
    case NotificationActionKind.NotificationRemove:
      return [...state.filter(notification1 => notification1.id != notification.id)]
    default:
      return state;
  }
}