import { CategoryValidityChangeAction } from './../../redux/actions/category/categoryValidityChangeAction';
import { getInvalidCategoryId } from './../../redux/state';
import { CategoryAction } from './../../redux/actions/category/categoryAction';
import { CategoryModel } from './../../models/categoryModel';
import { LocalizationServiceMock } from '../mocks/localizationServiecMock';
import { NotificationServiceMock } from '../mocks/notificationServiceMock';
import { StoreMock } from '../mocks/storeMock';
import { CategoryActionKind } from 'src/app/redux/actions/category/categoryActionKind';
import { MessageKind } from 'src/app/messageKind';
import { DeleteCategoryService } from './delete-category.service';
import { of } from 'rxjs';
import { NotesOfCategoryDeleteAction } from 'src/app/redux/actions/note/notesOfCategoryDeleteAction';
import { NoteActionKind } from 'src/app/redux/actions/note/noteActionKind';

describe('DeleteCategoryService', () =>
{
  let localizationService: LocalizationServiceMock;
  let notificationService: NotificationServiceMock;
  let storeMock: StoreMock;
  let service: DeleteCategoryService;
  let model: CategoryModel;

  beforeEach(() =>
  {
    model = new CategoryModel("1");
    localizationService = new LocalizationServiceMock();
    notificationService = new NotificationServiceMock();
    storeMock = new StoreMock();
    storeMock.resultSelector = (selector) => 
    {
      if (selector == getInvalidCategoryId)
        return of("1");
      else 
        return of({});
    };
    service = new DeleteCategoryService(storeMock, notificationService, localizationService);
  });

  it('category should be deleted', () => 
  {
    service.execute(model);

    let action1 = (storeMock.dispatchedActions[0] as NotesOfCategoryDeleteAction);
    expect(action1.type).toBe(NoteActionKind.NotesOfCategoryDelete);
    expect(action1.payload).toBe("1");
    
    let action2 = (storeMock.dispatchedActions[1] as CategoryAction);
    expect(action2.type).toBe(CategoryActionKind.CategoryDelete);
    expect(action2.payload).toBe(model);
  });

  it('invalid category id should be removed', () => 
  {
    service.execute(model);
    
    let action = (storeMock.dispatchedActions[2] as CategoryValidityChangeAction);
    expect(action.type).toBe(CategoryActionKind.CategoryValidityChange);
    expect(action.payload).toBe(null);
  });

  it('the deletion of the category should be notified', () => 
  {
    localizationService.returnValue = "test-notification"

    service.execute(model);

    expect(localizationService.names[0]).toBe(MessageKind.DeleteCategoryMessage);
    expect(localizationService.parameters[0]).toEqual({ title: "" });
    expect(notificationService.successMessage).toBe("test-notification");
  });

  it('title should be truncated', () => 
  {
    localizationService.returnValue = "test-notification";
    model.title = "test-title1234";

    service.execute(model);

    expect(localizationService.parameters[0]).toEqual({ title: "test-title..." });
  });
});
