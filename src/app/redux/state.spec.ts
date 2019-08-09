import { CategoryModel } from './../models/categories/categoryModel';
import { UserModel } from './../models/users/userModel';
import { IApplicationState, getInvalidNoteId, getInvalidCategoryId, getSelectedCategory, getUser, getTitle } from "./state";
import { NotificationModel } from '../models/notifications/notificationModel';

describe("getterFunctions", () =>
{
  let state: IApplicationState;

  beforeEach(() =>
  {
    state = {
      title: "testTitle",
      user: new UserModel({ uid: "1", email: "test" }),
      notifications: [
        new NotificationModel("1"),
        new NotificationModel("2")
      ],
      selectedCategory: new CategoryModel("1", "test1"),
      invalidCategoryId: "2",
      invalidNoteId: "3"
    }
  });

  it("getTitle returns the current title", () => expect(getTitle(state)).toBe("testTitle"));

  it("getUser returns the current user", () =>
  { 
    let user = getUser(state);
    expect(user.id).toBe("1");
    expect(user.email).toBe("test");
  });

  it("getInvalidNoteId returns the id of the invalid note", () =>
  { expect(getInvalidNoteId(state)).toBe("3"); });

  it("getInvalidCategoryId returns the id of the invalid category", () =>
  { expect(getInvalidCategoryId(state)).toBe("2"); });

  it("getSelectedCategoryId returns the id of selected category", () =>
  { 
    expect(getSelectedCategory(state).id).toBe("1"); 
    expect(getSelectedCategory(state).title).toBe("test1")
  });
});