import { CategoryAction } from './../../redux/actions/category/categoryAction';
import { CategoryModel } from './../../models/categoryModel';
import { SaveCategoryService } from './save-category.service';
import { LocalizationServiceMock } from '../mocks/localizationServiecMock';
import { NotificationServiceMock } from '../mocks/notificationServiceMock';
import { StoreMock } from '../mocks/storeMock';
import { CategoryActionKind } from 'src/app/redux/actions/category/categoryActionKind';
import { MessageKind } from 'src/app/messageKind';

describe('SaveCategoryService', () =>
{
  let localizationService: LocalizationServiceMock;
  let notificationService: NotificationServiceMock;
  let storeMock: StoreMock;
  let service: SaveCategoryService;
  let model: CategoryModel;

  beforeEach(() =>
  {
    model = new CategoryModel("test-id", "test-title");
    model.isEditing = true;
    localizationService = new LocalizationServiceMock();
    notificationService = new NotificationServiceMock();
    storeMock = new StoreMock();
    service = new SaveCategoryService(storeMock, notificationService, localizationService);
  });

  it('category should be saved', () => 
  {
    service.execute(model);

    let action = (storeMock.dispatchedActions[0] as CategoryAction);
    expect(action.type).toBe(CategoryActionKind.CategoryUpdate);
    expect(action.payload).toBe(model);
  });

  it('the saving of the changes should be notified', () => 
  {
    localizationService.returnValue = "test-notification"

    service.execute(model);

    expect(localizationService.names[0]).toBe(MessageKind.SaveCategoryMessage);
    expect(localizationService.parameters[0]).toEqual({ title: "test-title" });
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
