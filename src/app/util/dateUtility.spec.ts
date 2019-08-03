import { coalesce, clone, maxDate, minDate } from 'src/app/util/utility';
import { nullOrEmpty, truncate } from "./utility";
import { getMinuteDifference, getHourDifference, getDayDifference, getWeekDifference, getMonthDifference, getYearDifference } from './dateUtility';

describe("getMinuteDifference", () =>
{
  it("getMinuteDifference returns the right amount of minutes as difference", () =>
  {
    let date1 = new Date(2018, 10, 11, 9, 32, 15, 123);
    let date2 = new Date(2018, 10, 11, 9, 54, 24, 45);

    expect(getMinuteDifference(date1, date2)).toBe(22);
  });
});

describe("getHourDifference", () =>
{
  it("getHourDifference returns the right amount of hours as difference", () =>
  {
    let date1 = new Date(2018, 10, 11, 4, 32, 15, 123);
    let date2 = new Date(2018, 10, 11, 9, 54, 24, 45);
  
    expect(getHourDifference(date1, date2)).toBe(5);
  });
});

describe("getDayDifference", () =>
{
  it("getDayDifference returns the right amount of days as difference", () =>
  {
    let date1 = new Date(2018, 10, 11, 4, 32, 15, 123);
    let date2 = new Date(2018, 10, 23, 9, 54, 24, 45);
  
    expect(getDayDifference(date1, date2)).toBe(12);
  });
});

describe("getWeekDifference", () =>
{
  it("getWeekDifference returns the right amount of weeks as difference", () =>
  {
    let date1 = new Date(2018, 10, 2, 4, 32, 15, 123);
    let date2 = new Date(2018, 10, 24, 9, 54, 24, 45);
  
    expect(getWeekDifference(date1, date2)).toBe(3);
  });
});

describe("getMonthDifference", () =>
{
  it("getMonthDifference returns the right amount of months as difference", () =>
  {
    let date1 = new Date(2018, 4, 2, 4, 32, 15, 123);
    let date2 = new Date(2018, 11, 24, 9, 54, 24, 45);

    expect(getMonthDifference(date1, date2)).toBe(7);
  });
});

describe("getYearDifference", () =>
{
  it("getYearDifference returns the right amount of years as difference", () =>
  {
    let date1 = new Date(2014, 4, 2, 4, 32, 15, 123);
    let date2 = new Date(2019, 11, 24, 9, 54, 24, 45);

    expect(getYearDifference(date1, date2)).toBe(5);
  });
});