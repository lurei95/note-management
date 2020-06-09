import { Subject } from 'rxjs';
import { StoreMock } from '../../services/mocks/storeMock';
import { UserModel } from '../../models/users/userModel';
import { getUser, getInvalidCategoryId, getSelectedCategory } from '../../redux/state';
import { CategoriesService } from './categories.service';
import { CategoryModel } from '../../models/categories/categoryModel';
import { CategoryValidityChangeAction } from '../../redux/actions/category/categoryValidityChangeAction';
import { CategoryActionKind } from '../../redux/actions/category/categoryActionKind';
import { SelectedCategoryChangeAction } from '../../redux/actions/category/selectedCategoryChangeAction';
import { MessageKind } from '../../messageKind';
import { QueryDocumentSnapshot, DocumentData } from '@angular/fire/firestore';
import { NewCategoryChangeAction } from '../../redux/actions/category/newCategoryChangeAction';
import { invoke } from 'q';

describe('CategoriesService', () => 
{
  let service: CategoriesService;
  let model: CategoryModel;
  let currentUser = new Subject<UserModel>();
  let invalidCategoryId = new Subject<string>();
  let selectedCategory = new Subject<CategoryModel>();
  let store: StoreMock;
  let databaseServiceMock: any = 
  { 
    getCollection(): any {},
    getItem(): any {},
    deleteItem(): any {},
    updateItem(): any {},
    deleteAll(): any {}
  }
  let localizationServiceMock: any = { execute(): any { } }
  let notificationServiceMock: any = { notifySuccessMessage(): any { } }

  beforeEach(() => 
  {
    store = new StoreMock();
    model = new CategoryModel("1", "title1");
    model.timestamp = 1;
    store.resultSelector = (selector) =>
    {
      if (selector == getUser)
        return currentUser;
      else if (selector == getInvalidCategoryId)
        return invalidCategoryId;
      else if (selector == getSelectedCategory)
        return selectedCategory;
      return null;
    };
    service = new CategoriesService(store, databaseServiceMock, notificationServiceMock, 
      localizationServiceMock);
    currentUser.next(new UserModel({ uid: "1", email: "test@test.com" }));
  });

  it('should be created', () => expect(service).toBeTruthy());

  it("delete deletes the model", () => 
  {
    spyOn(databaseServiceMock, "getCollection").and.returnValue("test");
    let spy = spyOn(databaseServiceMock, "deleteItem");

    service.delete(model);

    expect(spy).toHaveBeenCalledWith("1", "test");
  });

  it("delete unsets the newCatgeoryId if category was new", () => 
  {
    service.delete(new CategoryModel("2"));

    let action: NewCategoryChangeAction = store.dispatchedActions[0] as NewCategoryChangeAction;
    expect(action.type).toBe(CategoryActionKind.NewCategoryChange);
    expect(action.payload == null).toBe(true);
  });

  it("delete unsets the invalid category", () => 
  {
    service.delete(model);
    invalidCategoryId.next("1");

    let action: CategoryValidityChangeAction = store.dispatchedActions
      .find(item => item instanceof CategoryValidityChangeAction) as CategoryValidityChangeAction;
    expect(action.payload).toBeNull();
    expect(action.type).toBe(CategoryActionKind.CategoryValidityChange);
  });

  it("delete unsets the selected category", () => 
  {
    service.delete(model);
    selectedCategory.next(model);

    let action: SelectedCategoryChangeAction = store.dispatchedActions
      .find(item => item instanceof SelectedCategoryChangeAction) as SelectedCategoryChangeAction;
    expect(action.payload).toBeNull();
    expect(action.type).toBe(CategoryActionKind.SelectedCategoryChange);
  });

  it("delete deletes all notes in the category", () => 
  {
    spyOn(databaseServiceMock, "getCollection").and.returnValue("test");
    let spy = spyOn<any>(databaseServiceMock, "deleteAll");
    service.delete(model);

    let filter: ((item: any) => boolean) 
      = spy.calls.first().args[1] as ((item: any) => boolean);
    expect(spy.calls.first().args[0]).toBe("test");
    const data1: DocumentData = { _categoryId: "4" };
    const data2: DocumentData = { _categoryId: "1" };
    expect(filter.call(data1)).toBe(false);
    expect(filter.call(data2)).toBe(true);
  });

  it("delete displays a success message", () => 
  {
    let spy1 = spyOn(localizationServiceMock, "execute").and.returnValue("test");
    let spy2 = spyOn(notificationServiceMock, "notifySuccessMessage");

    service.delete(model);

    expect(spy1.calls.first().args[0]).toBe(MessageKind.DeleteCategoryMessage);
    expect((spy1.calls.first().args[1] as { title: string }).title).toBe("title1");
    expect(spy2).toHaveBeenCalledWith("test");
  });

  it("save saves the model", () => 
  {
    spyOn(databaseServiceMock, "getCollection").and.returnValue("test");
    let spy = spyOn(databaseServiceMock, "updateItem");

    service.save(model);

    expect(spy).toHaveBeenCalledWith("1", "test", model);
  });

  it("save displays a success message", () => 
  {
    let spy1 = spyOn(localizationServiceMock, "execute").and.returnValue("test");
    let spy2 = spyOn(notificationServiceMock, "notifySuccessMessage");

    service.save(model);

    expect(spy1.calls.first().args[0]).toBe(MessageKind.SaveCategoryMessage);
    expect((spy1.calls.first().args[1] as { title: string }).title).toBe("title1");
    expect(spy2).toHaveBeenCalledWith("test");
  });

  it("validate returns an empty dictionary if the category is valid", () => 
  {
    let result = service.validate(model);
    expect(result.keys.length).toBe(0);
  });

  it("validate returns an error if the title is empty", () => 
  {
    let spy = spyOn(localizationServiceMock, "execute").and.returnValue("test");

    let result = service.validate(new CategoryModel("1"));

    expect(spy).toHaveBeenCalledWith(MessageKind.RequiredField);
    expect(result.keys.length).toBe(1);
    expect(result["title"]).toBe("test");
  });
});