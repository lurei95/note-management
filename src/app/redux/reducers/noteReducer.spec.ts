import { clone } from 'src/app/util/utility';
import { NoteAction } from '../actions/note/noteAction';
import { NoteActionKind } from '../actions/note/noteActionKind';
import { NoteModel } from 'src/app/models/noteModel';
import { CategoryAction } from '../actions/category/categoryAction';
import { CategoryActionKind } from '../actions/category/categoryActionKind';
import { noteReducer } from './noteReducer';
import { NotesRetrievedAction } from '../actions/note/notesRetrievedAction';
import { NotesOfCategoryDeleteAction } from '../actions/note/notesOfCategoryDeleteAction';

describe("noteReducer", () =>
{
  let model1: NoteModel;
  let model2: NoteModel;
  let model3: NoteModel;
  let state: NoteModel[]

  beforeEach(() =>
  {
    model1 = new NoteModel("1", "title1", "text1", "1");
    model2 = new NoteModel("2", "title2", "text2", "1");
    model3 = new NoteModel("3", "title3", "text3", "2");
    state = [model1, model2, model3];
  })

  it("other action shouldn't change the state", () =>
  {
    let action = new CategoryAction(CategoryActionKind.CategoryAdd, null);
    let result = noteReducer(state, action);

    expect(result).toBe(state);
  });

  it("add action adds a new note to the state", () =>
  {
    let action = new NoteAction(NoteActionKind.NoteAdd, model1);
    let result = noteReducer([], action);

    expect(result.length).toBe(1);
    expect(result[0]).toEqual(model1);
  });

  it("delete action removes the note", () =>
  {
    let modelToRemove = clone<NoteModel>(model3, NoteModel);
    let action = new NoteAction(NoteActionKind.NoteDelete, modelToRemove);
    let result = noteReducer(state, action);

    expect(result.length).toBe(2);
    expect(result).toContain(model1);
    expect(result).toContain(model2);
  });

  it("delete action with a not exisiting id does not remove any notes", () =>
  {
    let modelToRemove = new NoteModel("4");
    let action = new NoteAction(NoteActionKind.NoteDelete, modelToRemove);
    let result = noteReducer(state, action);

    expect(result.length).toBe(3);
  });

  it("update action updates the note", () =>
  {
    let modeltoUpdate = new NoteModel("1", "newTitle", "newText", "1");
    let action = new NoteAction(NoteActionKind.NoteUpdate, modeltoUpdate);
    let result = noteReducer(state, action);

    expect(result.length).toBe(3);
    expect(result[0].title).toBe("newTitle");
    expect(result[0].text).toBe("newText");
  });

  it("retrieved action returns the retrieved notes", () =>
  {
    let notes = [model1, model2];
    let action = new NotesRetrievedAction(notes);
    let result = noteReducer([], action);

    expect(result.length).toBe(2);
    expect(result).toContain(model1);
    expect(result).toContain(model2);
  });

  it("notes of category delete action removes all notes of the category", () =>
  {
    let action = new NotesOfCategoryDeleteAction("1");
    let result = noteReducer(state, action);

    expect(result.length).toBe(1);
    expect(result).toContain(model3);
  });
});