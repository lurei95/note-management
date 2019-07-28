import { noteValidityReducer } from './noteValidityReducer';
import { NoteValidityChangeAction } from '../actions/note/noteValidityChangeAction';
import { NoteAction } from '../actions/note/noteAction';
import { NoteActionKind } from '../actions/note/noteActionKind';

describe("noteValidityReducer", () =>
{
  let state: string

  beforeEach(() => state = "1");

  it("other action shouldn't change the state", () =>
  {
    let action = new NoteAction(NoteActionKind.NotesOfCategoryDelete, null);
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