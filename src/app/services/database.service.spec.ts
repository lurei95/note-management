import { DatabaseService } from './database.service';

describe('DatabaseService', () => 
{
  let service: DatabaseService;
  let databaseMock = { collection(route: string): any {}}

  beforeEach(() => service = new DatabaseService((databaseMock as any)));

  it('should be created', () => expect(service).toBeTruthy());

  it("getCollection returns the collection from the database", () => 
  {
    let spy = spyOn(databaseMock, "collection").and.returnValue("test");

    let result: any = service.getCollection("test-collection");

    expect(spy).toHaveBeenCalledWith("test-collection");
    expect(result).toBe("test");
  });

  it("getCollection returns the collection from the item in the database", () => 
  {
    let itemMock: any = { collection(): any {} }
    let spy = spyOn(itemMock, "collection").and.returnValue("test");

    let result: any = service.getCollection("test-collection", itemMock);

    expect(spy).toHaveBeenCalledWith("test-collection");
    expect(result).toBe("test");
  });

  it("getItem returns the item from a collection in the database", () => 
  {
    let collectionMock: any = { doc(): any {} }
    let spy = spyOn(collectionMock, "doc").and.returnValue("test");

    let result: any = service.getItem("test-item", collectionMock);

    expect(spy).toHaveBeenCalledWith("test-item");
    expect(result).toBe("test");
  });

  it("deleteItem deletes the item from the collection in the database", () => 
  {
    let collectionMock: any = { doc(): any {} };
    let itemMock: any = { delete() {} };
    let spy1 = spyOn(collectionMock, "doc").and.returnValue(itemMock);
    let spy2 = spyOn(itemMock, "delete");

    service.deleteItem("test-item", collectionMock);

    expect(spy1).toHaveBeenCalledWith("test-item");
    expect(spy2).toHaveBeenCalled();
  });

  it("updateItem updates the item in the database", () => 
  {
    let collectionMock: any = { doc(): any {} };
    let itemMock: any = { set() {} };
    let spy1 = spyOn(collectionMock, "doc").and.returnValue(itemMock);
    let spy2 = spyOn(itemMock, "set");
    let newItem = { id: "test" };

    service.updateItem("test-item", collectionMock, newItem);

    expect(spy1).toHaveBeenCalledWith("test-item");
    expect(spy2).toHaveBeenCalled();
  });
});
