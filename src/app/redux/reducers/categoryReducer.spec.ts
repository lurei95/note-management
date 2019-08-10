import { NotificationActionKind } from 'src/app/redux/actions/notification/notificationActionKind';
import { CategoryModel } from './../../models/categories/categoryModel';
import { SelectedCategoryChangeAction } from './../actions/category/selectedCategoryChangeAction';
import { categoryReducer } from './categoryReducer';
import { NotificationAction } from '../actions/notification/notificationAction';
import { CategoryValidityChangeAction } from '../actions/category/categoryValidityChangeAction';
import { NewCategoryChangeAction } from '../actions/category/newCategoryChangeAction';

describe("categoryReducer", () =>
{
  let state: { selectedCategory: CategoryModel; invalidCategoryId: string; newCategoryId: string; };

  beforeEach(() => 
  {
    state = {
      selectedCategory: new CategoryModel("1"),
      invalidCategoryId: "1",
      newCategoryId: "1"
    }
  });

  it("other action shouldn't change the state", () =>
  {
    let action = new NotificationAction(NotificationActionKind.NotificationAdd, null);
    let result = categoryReducer(state, action);

    expect(result).toBe(state);
  });

  it("SelectedCategoryChangeAction changes the selected category", () =>
  {
    let action = new SelectedCategoryChangeAction(new CategoryModel("2"));
    expect(categoryReducer(state, action).selectedCategory.id).toBe("2");
  });

  it("ValidityChangeAction sets the invalidCategoryId", () =>
  {
    let action = new CategoryValidityChangeAction("2");
    expect(categoryReducer(state, action).invalidCategoryId).toBe("2");
  });

  it("NewCategoryChange action sets the newCategoryId", () =>
  {
    let action = new NewCategoryChangeAction("2");
    expect(categoryReducer(state, action).newCategoryId).toBe("2");
  });
});