import { NotificationModel } from '../../models/notifications/notificationModel';
import { NotificationKind } from '../../models/notifications/notificationKind';
import { Store } from '@ngrx/store';
import { v4 as uuid } from 'uuid';
import { NotificationAction } from '../../redux/actions/notification/notificationAction';
import { NotificationActionKind } from '../../redux/actions/notification/notificationActionKind';
import { IApplicationState } from '../../redux/state';

/**
 * Service for displaying notification messages
 */
export class NotificationService
{
  /**
   * Constructor
   * 
   * @param {Store<IApplicationState>} store Injected: redux store
   */
  constructor(private store: Store<IApplicationState>) { }

  /**
   * Displays the message as an error
   * 
   * @param {string} message The message to display
   */
  notifyError(message: string) { this.notifyCore(message, NotificationKind.Error); }

  /**
   * Displays the message as a warning
   * 
   * @param {string} message The message to display
   */
  notifyWarning(message: string) { this.notifyCore(message, NotificationKind.Warning); }

  /**
   * Displays the message as a success message
   * 
   * @param {string} message The message to display
   */
  notifySuccessMessage(message: string) { this.notifyCore(message, NotificationKind.Success); }

  private notifyCore(message: string, notificationKind: NotificationKind)
  {
    let notification = new NotificationModel(uuid(), notificationKind, message);
    this.store.dispatch(new NotificationAction(NotificationActionKind.NotificationAdd, notification)); 
    setTimeout(() => {
      this.store.dispatch(new NotificationAction(NotificationActionKind.NotificationRemove, notification)); 
    }, 5000);
  }
}