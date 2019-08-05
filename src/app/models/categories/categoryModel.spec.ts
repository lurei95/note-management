import { CategoryModel } from './categoryModel';

describe("CategoryModel", () =>
{
  function equalTestCore(id: string, title: string, expectedResult: boolean)
  { 
    let category1 = new CategoryModel("1", "title1");
    let category2 = new CategoryModel(id, title);

    expect(category1.equals(category2)).toBe(expectedResult); 
  }

  it("clone clones the CategoryModel", () =>
  {
    let category = new CategoryModel("1", "title1");

    let copy = category.clone();

    expect(copy.id).toBe("1");
    expect(copy.title).toBe("title1");
  });

  it("equals returns true if categories are equal", () => equalTestCore("1", "title1", true));

  it("equals returns false if id differs", () => equalTestCore("2", "title1", false));

  it("equals returns false if title differs", () => equalTestCore("1", "other title", false));
});