import { noteValidityReducer } from './noteValidityReducer';
import { NoteValidityChangeAction } from '../actions/note/noteValidityChangeAction';
import { NotificationAction } from '../actions/notification/notificationAction';
import { NotificationActionKind } from '../actions/notification/notificationActionKind';

describe("noteValidityReducer", () =>
{
  let state: string

  beforeEach(() => state = "1");

  it("other action shouldn't change the state", () =>
  {
    let action = new NotificationAction(NotificationActionKind.NotificationAdd, null);
    let result = noteValidityReducer(state, action);

    expect(result).toBe(state);
  });

  it("validity change action sets the invalid note id", () =>
  {
    let action = new NoteValidityChangeAction("2");
    let result = noteValidityReducer(state, action);

    expect(result).toBe("2");
  });
});