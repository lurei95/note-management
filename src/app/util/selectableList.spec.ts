import { SelectableList } from './selectableList';

describe("SelectableList", () =>
{
  let defaultItems: string[];
  let defaultList: SelectableList<string>

  beforeEach(() => 
  {
    defaultItems = ["test1", "test2", "test3"];
    defaultList = new SelectableList<string>(defaultItems);
  })  

  //Constructor
  it("constructor initializes the selected item with first item when not provided", () =>
  {
    expect(defaultList.selectedItem).toBe("test1");
    expect(defaultList.items).toBe(defaultItems);
  });
  it("constructor initializes the selected item with provided value", () =>
  {
    let list = new SelectableList<string>(defaultItems, "test3");
    expect(list.selectedItem).toBe("test3");
    expect(list.items).toBe(defaultItems);
  });

  //SelectedItem
  it("selectedItem is set when item is in the list", () =>
  {
    defaultList.selectedItem = "test2";

    expect(defaultList.selectedItem).toBe("test2");
  });

  it("selectedItem is not set when item is not in the list", () =>
  {
    defaultList.selectedItem = "test4";

    expect(defaultList.selectedItem).toBe("test1");
  });
  it("selectedItem is set null when item is null", () =>
  {
    defaultList.selectedItem = null;

    expect(defaultList.selectedItem).toBe(null);
  });

  //AddItem
  it("addItem adds the new item", () =>
  {
    defaultList.addItem("test4");

    expect(defaultList.items[3]).toBe("test4");
  });
  it("addItem sets the selected item if the list was empty before", () =>
  {
    let items = [];
    let list = new SelectableList<string>(items);

    list.addItem("test1");

    expect(list.selectedItem).toBe("test1");
  });

  //RemoveItem
  it("removeItem removes the item", () =>
  {
    defaultList.removeItem("test3");

    expect(defaultList.items.length).toBe(2);
    expect(defaultList.items[0]).toBe("test1");
    expect(defaultList.items[1]).toBe("test2");
  });
  it("removeItem sets a new selected item when the selected item has been removed", () =>
  {
    let items = ["test1", "test2"];
    let list = new SelectableList<string>(items, "test1");

    list.removeItem("test1");
    expect(list.selectedItem).toBe("test2");

    list.removeItem("test2");
    expect(list.selectedItem).toBe(null);
  });

  //Remove
  it("remove removes the first item that matches the predicate", () =>
  {
    defaultList.remove(item => item == "test2");
    
    expect(defaultList.items.length).toBe(2);
    expect(defaultList.items[0]).toBe("test1");
    expect(defaultList.items[1]).toBe("test3");
  });
  it("remove sets a new selected item when the selected item has been removed", () =>
  {
    let items = ["test1", "test2"];
    let list = new SelectableList<string>(items, "test1");

    list.remove(item => item == "test1");
    expect(list.selectedItem).toBe("test2");

    list.remove(item => item == "test2");
    expect(list.selectedItem).toBe(null);
  });

  //RemoveAt
  it("removeAt removes the item at the specified index", () =>
  {
    defaultList.removeAt(1);

    expect(defaultList.items.length).toBe(2);
    expect(defaultList.items[0]).toBe("test1");
    expect(defaultList.items[1]).toBe("test3");
  });
  it("removeAt sets a new selected item when the selected item has been removed", () =>
  {
    let items = ["test1", "test2"];
    let list = new SelectableList<string>(items, "test1");

    list.removeAt(0);
    expect(list.selectedItem).toBe("test2");

    list.removeAt(0);
    expect(list.selectedItem).toBe(null);
  });

  it("removeAt does not do anything when index out of bounds", () =>
  {
    let items = ["test1", "test2"];
    let list = new SelectableList<string>(items, "test1");

    list.removeAt(-1);
    expect(list.count()).toBe(2);

    list.removeAt(2);
    expect(list.count()).toBe(2);
  });

  //IndexOf
  class TestClass {
    constructor(public propertyA: string) {}
  }

  it("indexOf returns the index of the same object in the list", () =>
  {
    let item = new TestClass("test2")
    let items = [new TestClass("test1"), item];
    let list = new SelectableList<TestClass>(items, item);

    expect(list.indexOf(item)).toBe(1);
  });
  it("indexOf returns -1 for objects not in the list", () =>
  {
    let items = [new TestClass("test1"), new TestClass("test2")];
    let list = new SelectableList<TestClass>(items);

    expect(list.indexOf(new TestClass("test3"))).toBe(-1);
  });

  //findIndex
  it("findIndex returns the index of the first item matching the predicate", () =>
  { 
    expect(defaultList.findIndex(item => item == "test3")).toBe(2);
  });
  it("findIndex returns -1 if there is no item matching the predicate", () =>
  {
    expect(defaultList.findIndex(item => item == "test4")).toBe(-1);
  });

  //Count
  it("count returns the number of items in the list", () =>
  {
    expect(defaultList.count()).toBe(3);
  });
});