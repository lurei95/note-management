import { NoteAction } from '../actions/note/noteAction';
import { NoteActionKind } from '../actions/note/noteActionKind';
import { UserModel } from 'src/app/models/users/userModel';
import { userReducer } from './userReducer';
import { UserChangeAction } from '../actions/user/userChangeAction';

describe("userReducer", () =>
{
  let state: UserModel;

  beforeEach(() => state = new UserModel({ uid: "1", email: "bla@test.com"}));

  it("other action shouldn't change the state", () =>
  {
    let action = new NoteAction(NoteActionKind.NotesOfCategoryDelete, null);
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