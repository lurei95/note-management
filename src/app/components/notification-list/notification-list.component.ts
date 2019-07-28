import { NotificationModel } from './../../models/notificationModel';
import { Component} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Store } from '@ngrx/store';
import { IApplicationState, getNotifications } from 'src/app/redux/state';

/**
 * Component for showing notifications
 */
@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css'],
  animations: [
    trigger('simpleFadeAnimation', [
      state('in', style({opacity: 1})),
      transition(':leave', animate(600, style({opacity: 0})))
    ])
  ]
})
export class NotificationListComponent
{
  private _notifications: NotificationModel[] = [];
  /**
   * @returns {NotificationModel[]} A List of the currently displayed notifications
   */
  get notifications(): NotificationModel[] { return this._notifications; }

  /**
   * Constructor
   * 
   * @param {Store<IApplicationState>} store Injected: redux store
   */
  constructor(store: Store<IApplicationState>) 
  { 
    store.select(getNotifications).subscribe(
      (x: NotificationModel[]) => this.handleNotificationsChanged(x)); 
  }

  /**
   * Event handler: removes a notification from the displayed notifications
   * 
   * @param {NotificationModel} item Notification to remove
   */
  handleRemoveButtonClicked(item: NotificationModel)
  {
    const index = this.notifications.findIndex(notification => notification.id == item.id);
    this.notifications.splice(index, 1);
  }

  private handleNotificationsChanged(notifications: NotificationModel[])
  { this._notifications = notifications; }
}