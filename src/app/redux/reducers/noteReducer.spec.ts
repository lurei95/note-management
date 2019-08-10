import { noteReducer } from './noteReducer';
import { NoteValidityChangeAction } from '../actions/note/noteValidityChangeAction';
import { NotificationAction } from '../actions/notification/notificationAction';
import { NotificationActionKind } from '../actions/notification/notificationActionKind';
import { NewNoteChangeAction } from '../actions/note/newNoteChangeAction';

describe("noteReducer", () =>
{
  let state: { invalidNoteId: string, newNoteId: string}

  beforeEach(() => 
  {
    state = {
      invalidNoteId: "1",
      newNoteId: "1"
    }
  });

  it("other action shouldn't change the state", () =>
  {
    let action = new NotificationAction(NotificationActionKind.NotificationAdd, null);
    let result = noteReducer(state, action);
    expect(result).toBe(state);
  });

  it("ValidityChangeAction sets the invalidNoteId", () =>
  {
    let action = new NoteValidityChangeAction("2");
    let result = noteReducer(state, action);
    expect(result.invalidNoteId).toBe("2");
  });

  it("newNoteChangeAction sets the newNoteId", () =>
  {
    let action = new NewNoteChangeAction("2");
    let result = noteReducer(state, action);
    expect(result.newNoteId).toBe("2");
  });
});