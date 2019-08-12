import { Subject } from 'rxjs';
import { StoreMock } from 'src/app/services/mocks/storeMock';
import { ModelService } from './modelService';
import { NoteModel } from 'src/app/models/notes/noteModel';
import { DocumentData } from '@angular/fire/firestore';
import { UserModel } from 'src/app/models/users/userModel';
import { getUser } from 'src/app/redux/state';

describe('ModelService', () => 
{
  class TestModelService extends ModelService<NoteModel>
  {
    protected get path() { return "test" }
    
    protected mapToModel(data: DocumentData): NoteModel { return new NoteModel(); }
  }

  let service: TestModelService;
  let currentUser: Subject<UserModel>;
  let store: StoreMock;
  let databaseServiceMock: any = 
  { 
    getCollection(): any {},
    getItem(): any {},
    deleteItem(): any {},
    updateItem(): any {}
  }

  beforeEach(() => 
  {
    spyOn(databaseServiceMock, "getItem").and.returnValue("testItem");
    spyOn(databaseServiceMock, "getCollection").and.returnValue("testCollection");
    currentUser = new Subject<UserModel>();
    store = new StoreMock();
    store.resultSelector = (selector) =>
    {
      if (selector == getUser)
        return currentUser;
      return null;
    }
    service = new TestModelService(store, databaseServiceMock);
    currentUser.next(new UserModel({ uid: "1", email: "test@test.com" }));
  });

  it('should be created', () => expect(service).toBeTruthy());

  it("selects user document on user changed", () => 
  { expect((service as any).userDoc).toBe("testItem"); });

  it("delete deletes the model", () => 
  {
    let spy = spyOn(databaseServiceMock, "deleteItem")
    service.delete(new NoteModel("1"))
    expect(spy).toHaveBeenCalledWith("1", "testCollection");
  });

  it("save saves the model", () => 
  {
    let spy = spyOn(databaseServiceMock, "updateItem")
    let model = new NoteModel("1");
    service.save(model)
    expect(spy).toHaveBeenCalledWith("1", "testCollection", model);
  });

  it("validate returns an empty dictionary", () => 
  {
    let result = service.validate(new NoteModel("1"));
    expect(result.keys.length).toBe(0);
  });
});