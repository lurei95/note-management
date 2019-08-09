import { CategoryValidityChangeAction } from './../actions/category/categoryValidityChangeAction';
import { titleReducer } from './titleReducer';
import { TitleChangeAction } from '../actions/other/titleChangeAction';

describe("notificationReducer", () =>
{
  let state: string;

  beforeEach(() => state = "testTitle");

  it("other action shouldn't change the state", () =>
  {
    let action = new CategoryValidityChangeAction(null);
    let result = titleReducer(state, action);
    expect(result).toBe(state);
  });

  it("change title action changes the title", () =>
  {
    let action = new TitleChangeAction("newTitle");
    expect(titleReducer(state, action)).toBe("newTitle");
  });
});