import { NotificationKind } from '../../models/notifications/notificationKind';
import { NotificationService } from './notificationService';
import { NotificationAction } from '../../redux/actions/notification/notificationAction';
import { StoreMock } from '../mocks/storeMock';
import { NotificationActionKind } from '../../redux/actions/notification/notificationActionKind';

describe('ValidateCategoryService', () => 
{
  let storeMock: StoreMock;
  let service: NotificationService;

  beforeEach(() =>
  {
    storeMock = new StoreMock();
    service = new NotificationService(storeMock);
  });

  function testNotficationCore(notificationKind: NotificationKind)
  {
    let action = (storeMock.dispatchedActions[0] as NotificationAction);
    expect(action.type).toBe(NotificationActionKind.NotificationAdd);
    let notification = action.payload;
    expect(notification.message).toBe("test-notification");
    expect(notification.notificationKind).toBe(notificationKind);
  }

  it("notifyError should create an error notification", () => 
  {
    service.notifyError("test-notification");
    testNotficationCore(NotificationKind.Error);
  });

  it("notifyWarning should create an warning notification", () => 
  {
    service.notifyWarning("test-notification");
    testNotficationCore(NotificationKind.Warning);
  });

  it("notifySuccessMessage should create an success notification", () => 
  {
    service.notifySuccessMessage("test-notification");
    testNotficationCore(NotificationKind.Success);
  });
});