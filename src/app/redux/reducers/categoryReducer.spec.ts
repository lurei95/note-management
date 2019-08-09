import { NotificationActionKind } from 'src/app/redux/actions/notification/notificationActionKind';
import { CategoryModel } from './../../models/categories/categoryModel';
import { SelectedCategoryChangeAction } from './../actions/category/selectedCategoryChangeAction';
import { categoryReducer } from './categoryReducer';
import { NotificationAction } from '../actions/notification/notificationAction';

describe("categoryReducer", () =>
{
  let state: CategoryModel

  beforeEach(() => state = new CategoryModel("1"));

  it("other action shouldn't change the state", () =>
  {
    let action = new NotificationAction(NotificationActionKind.NotificationAdd, null);
    let result = categoryReducer(state, action);

    expect(result).toBe(state);
  });

  it("selected category change action changes the selected category", () =>
  {
    let action = new SelectedCategoryChangeAction(new CategoryModel("2"));

    expect(categoryReducer(state, action).id).toBe("2");
  });
});