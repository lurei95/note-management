import { UserModel } from 'src/app/models/users/userModel';
import { userReducer } from './userReducer';
import { UserChangeAction } from '../actions/user/userChangeAction';
import { NotificationAction } from '../actions/notification/notificationAction';
import { NotificationActionKind } from '../actions/notification/notificationActionKind';

describe("userReducer", () =>
{
  let state: UserModel;

  beforeEach(() => state = new UserModel({ uid: "1", email: "bla@test.com"}));

  it("other action shouldn't change the state", () =>
  {
    let action = new NotificationAction(NotificationActionKind.NotificationAdd, null);
    let result = userReducer(state, action);

    expect(result).toBe(state);
  });

  it("add action adds a new notification to the state", () =>
  {
    let newUser = new UserModel({ uid: "2", email: "test123"});
    let action = new UserChangeAction(newUser);
    let result = userReducer(newUser, action);

    expect(result).toEqual(newUser);
  });
});