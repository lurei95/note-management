import { NotificationService } from '../notification/notificationService';

/**
 * Mock service for {@link NotificationService}
 */
export class NotificationServiceMock extends NotificationService
{
  /**
   * Displayed error
   */
  error: string;
  /**
   * Displayed warning
   */
  warning: string
  /**
   * Displayed success message
   */
  successMessage: string;

  /**
   * Constructor
   */
  constructor() { super(null) }

  /**
   * Displays the message as an error
   * 
   * @param {string} message The message to display
   */
  notifyError(message: string) { this.error = message; }

  /**
   * Displays the message as a warning
   * 
   * @param {string} message The message to display
   */
  notifyWarning(message: string) { this.warning = message; }

  /**
   * Displays the message as a success message
   * 
   * @param {string} message The message to display
   */
  notifySuccessMessage(message: string) { this.successMessage = message; }
}