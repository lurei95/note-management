import { notificationReducer } from "./notificationReducer";
import { NotificationAction } from '../actions/notification/notificationAction';
import { NotificationActionKind } from '../actions/notification/notificationActionKind';
import { NotificationModel } from 'src/app/models/notifications/notificationModel';
import { clone } from 'src/app/util/utility';
import { NoteAction } from '../actions/note/noteAction';
import { NoteActionKind } from '../actions/note/noteActionKind';
import { NotificationKind } from 'src/app/models/notifications/notificationKind';

describe("notificationReducer", () =>
{
  let model: NotificationModel;
  let state: NotificationModel[]

  beforeEach(() =>
  {
    model = new NotificationModel("1", NotificationKind.Error, "test");
    state = [model];
  })

  it("other action shouldn't change the state", () =>
  {
    let action = new NoteAction(NoteActionKind.NotesOfCategoryDelete, null);
    let result = notificationReducer(state, action);

    expect(result).toBe(state);
  });

  it("add action adds a new notification to the state", () =>
  {
    let action = new NotificationAction(NotificationActionKind.NotificationAdd, model);
    let result = notificationReducer([], action);

    expect(result.length).toBe(1);
    expect(result[0]).toBe(model);
  });

  it("remove action removes the notification", () =>
  {
    let modelToRemove = clone<NotificationModel>(model, NotificationModel);
    let action = new NotificationAction(NotificationActionKind.NotificationRemove, modelToRemove);
    let result = notificationReducer(state, action);

    expect(result.length).toBe(0);
  });

  it("remove action with a not exisiting id does not remove any notification", () =>
  {
    let modelToRemove = new NotificationModel("2");
    let action = new NotificationAction(NotificationActionKind.NotificationRemove, modelToRemove);
    let result = notificationReducer(state, action);

    expect(result.length).toBe(1);
  });
});