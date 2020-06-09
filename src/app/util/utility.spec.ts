import { coalesce, clone, maxDate, minDate } from '../util/utility';
import { nullOrEmpty, truncate } from "./utility";

describe("nullOrEmpty", () =>
{
  it("nullOrEmpty returns true for empty string", () =>
  {
    let test = "";
    expect(nullOrEmpty(test)).toBe(true);
  });

  it("nullOrEmpty returns true for null string", () =>
  { expect(nullOrEmpty(null)).toBe(true); });

  it("nullOrEmpty returns true for undefined string", () =>
  {
    let test: string;
    expect(nullOrEmpty(test)).toBe(true);
  });

  it("nullOrEmpty returns false for non-empty string", () =>
  {
    let test = "This string is not empty";
    expect(nullOrEmpty(test)).toBe(false);
  });
});

describe("truncate", () =>
{
  it("truncate returns a truncated string if the strings length is bigger than maxLength", () =>
  {
    let test = "This is a test string";
    expect(truncate(test, 10)).toBe("This is a ...");
  });

  it("truncate returns the original string if the strings length is smaller than maxLength", () =>
  {
    let test = "This is a test string";
    expect(truncate(test, 30)).toBe(test);
  });

  it("truncate returns an empty string if the strings is null", () =>
  { expect(truncate(null, 1)).toBe(""); });

  it("truncate returns an empty string if the strings is undefined", () =>
  { 
    let test: string;
    expect(truncate(test, 1)).toBe(""); 
  });
});

describe("coalesce", () =>
{
  it("coalesce returns the original string if it's not null or undefined", () =>
  {
    let test = "This is a test string";
    expect(coalesce(test, "test")).toBe(test);
  });

  it("coalesce returns the default value if the original string is null", () =>
  { expect(coalesce(null, "test")).toBe("test"); });

  it("coalesce returns the default value if the original string is undefined", () =>
  {
    let test: string;
    expect(coalesce(test, "test")).toBe("test");
  });
});

describe("clone", () =>
{
  class TestClass
  {
    propertyA: string;
    propertyB: number;
  }

  it("clone clones the object", () =>
  {
    let test = new TestClass();
    test.propertyA = "test";
    test.propertyB = 12;
    let result = clone<TestClass>(test, TestClass);
    expect(result).toBeDefined();
    expect(result.propertyA).toBe("test");
    expect(result.propertyB).toBe(12);
  });
});

describe("maxDate", () => 
{
  it("maxDate returns the maximum date value", () => 
  { expect(maxDate()).toEqual(new Date(8640000000000000)); });
});

describe("minDate", () => 
{
  it("minDate returns the minimum date value", () => 
  { expect(minDate()).toEqual(new Date(-8640000000000000)); });
});