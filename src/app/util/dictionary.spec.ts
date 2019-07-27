import { Dictionary } from './dictionary';

describe("Dictionary", () =>
{
  let defaultItems: { key: string, value: string }[]
  let defaultDictionary: Dictionary<string>

  beforeEach(() => 
  {
    defaultItems = [{ key: "key1", value: "value1" }, { key: "key2", value: "value2" }];
    defaultDictionary = new Dictionary<string>(defaultItems);
  })  

  //Constructor
  it("constructor initializes the dictianary with the provided values", () =>
  {
    expect(defaultDictionary.keys[0]).toBe("key1");
    expect(defaultDictionary.keys[1]).toBe("key2");
    expect(defaultDictionary.values[0]).toBe("value1");
    expect(defaultDictionary.values[1]).toBe("value2");
  });

  //Add
  it("add adds the new item", () =>
  {
    defaultDictionary.add("key3", "value3");

    expect(defaultDictionary["key3"]).toBe("value3")
    expect(defaultDictionary.keys[2]).toBe("key3");
    expect(defaultDictionary.values[2]).toBe("value3");
  });

  //Remove
  it("remove removes the item with the specified key", () =>
  {
    defaultDictionary.remove("key1");
    expect(defaultDictionary.keys.length).toBe(2);
    expect(defaultDictionary.values.length).toBe(2);
  });

  //ContainsKey
  it("containsKey returns true if the dictionary contains the key", () =>
  {
    expect(defaultDictionary.containsKey("key1")).toBe(true);
  });
  it("containsKey returns false if the dictionary does not contain the key", () =>
  {
    expect(defaultDictionary.containsKey("key3")).toBe(false);
  });
});