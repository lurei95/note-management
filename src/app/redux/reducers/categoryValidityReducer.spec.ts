import { NotificationActionKind } from 'src/app/redux/actions/notification/notificationActionKind';
import { categoryValidityReducer } from './categoryValidityReducer';
import { CategoryValidityChangeAction } from '../actions/category/categoryValidityChangeAction';
import { NotificationAction } from '../actions/notification/notificationAction';

describe("categoryValidityReducer", () =>
{
  let state: string

  beforeEach(() => state = "1");

  it("other action shouldn't change the state", () =>
  {
    let action = new NotificationAction(NotificationActionKind.NotificationAdd, null);
    let result = categoryValidityReducer(state, action);

    expect(result).toBe(state);
  });

  it("validity change action sets the invalid note id", () =>
  {
    let action = new CategoryValidityChangeAction("2");
    let result = categoryValidityReducer(state, action);

    expect(result).toBe("2");
  });
});