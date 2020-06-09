import { NotificationKind } from '../../models/notifications/notificationKind';

/**
 * Model for a notification message
 */
export class NotificationModel
{
  /**
   * @returns {string} ID of the notification
   */
  get id(): string { return this._id; }

  /**
   * @returns {string} Message of the notification
   */
  get message(): string { return this._message; }
  /**
   * @param {string} value Message of the notification
   */
  set message(value: string) { this._message = value; }
  /**
   * @returns {NotificationKind} Kind of the notification
   */
  get notificationKind(): NotificationKind { return this._notificationKind; }
  /**
   * @param {string} value Kind of the notification
   */
  set notificationKind(value: NotificationKind) { this._notificationKind = value; }

  /**
   * Constructor
   * 
   * @param {string} _id Kind of the notification
   * @param {string} _notificationKind Kind of the notification
   * @param {string} _message Message of the notification
   */
  constructor(private _id?: string, private _notificationKind?: NotificationKind, 
    private _message?: string) { }
}