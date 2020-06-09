import { CategoryModel } from '../../models/categories/categoryModel';
import { UserModel } from './../../models/users/userModel';
import { AddUserService } from './add-user.service';

describe('AddUserService', () => 
{
  let databaseServiceMock: any = 
  { 
    getCollection(): any {},
    getItem(): any {},
    updateItem(): any {}
  }
  let service: AddUserService;
  
  beforeEach(() => service = new AddUserService(databaseServiceMock));

  it('should be created', () => expect(service).toBeTruthy());

  it('the service saves the new user in the database', () => 
  {
    spyOn(databaseServiceMock, "getCollection").and.returnValue("test")
    let spy = spyOn(databaseServiceMock, "updateItem");
    let user = new UserModel({ uid: "1", email: "test@test.com" });
    service.execute(user);
    expect(spy).toHaveBeenCalledWith("1", "test", user);
  });

  it('the service creates a default category for the user', () => 
  {
    let wasCategoryCreated: boolean = false;
    spyOn(databaseServiceMock, "updateItem").and.callFake((id, collection, model) =>
    {
      if (model instanceof CategoryModel)
        wasCategoryCreated = true;
    });
    let user = new UserModel({ uid: "1", email: "test@test.com" });
    service.execute(user);
    expect(wasCategoryCreated).toBeTruthy();
  });
});
