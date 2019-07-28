import { CategoryModel } from './../models/categoryModel';
import { IApplicationState, getInvalidNoteId, getInvalidCategoryId, getNotes, getNote, getCategories, getSelectedCatgeory, getNotesOfCategory } from "./state";
import { NoteModel } from '../models/noteModel';
import { NotificationModel } from '../models/notificationModel';
import { SelectableList } from '../util/selectableList';

describe("getterFunctions", () =>
{
  let state: IApplicationState;

  beforeEach(() =>
  {
    state = {
      notes: [
        new NoteModel("1", "title1", "text1", "1"), 
        new NoteModel("2", "title2", "text2", "1"),
        new NoteModel("3", "title3", "text3", "2")
      ],
      notifications: [
        new NotificationModel("1"),
        new NotificationModel("2")
      ],
      categoryInformation: new SelectableList([
        new CategoryModel("1", "title1"),
        new CategoryModel("2", "title2")
      ]),
      invalidCategoryId: "2",
      invalidNoteId: "3"
    }
  })

  it("getInvalidNoteId returns the id of the invalid note", () =>
  { expect(getInvalidNoteId(state)).toBe("3"); });

  it("getInvalidCategoryId returns the id of the invalid category", () =>
  { expect(getInvalidCategoryId(state)).toBe("2"); });

  it("getNotes returns all notes", () =>
  { expect(getNotes(state).length).toBe(3); });

  it("getNotesOfCategory returns all notes of a category", () =>
  { 
    expect(getNotesOfCategory(state, "1").length).toBe(2);
    expect(getNotesOfCategory(state, "2").length).toBe(1); 
  });

  it("getNote returns the note", () =>
  { 
    expect(getNote(state, "1").title).toBe("title1");
    expect(getNote(state, "2").title).toBe("title2"); 
    expect(getNote(state, "3").title).toBe("title3"); 
  });

  it("getCategories returns all categories", () =>
  { expect(getCategories(state).length).toBe(2); });

  it("getSelectedCategory returns the selected category", () =>
  { expect(getSelectedCatgeory(state).title).toBe("title1"); });
});