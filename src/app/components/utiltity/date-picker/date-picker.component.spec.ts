import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DatePickerComponent } from './date-picker.component';
import {  MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { minDate, maxDate } from '../../../util/utility';

describe('DatePickerComponent', () =>
{
  let component: DatePickerComponent;
  let fixture: ComponentFixture<DatePickerComponent>;
  let field: HTMLInputElement;
  let date: Date;

  beforeEach(async(() => 
  { 
    TestBed.configureTestingModule(
    { 
      declarations: [ DatePickerComponent ], 
      imports: [ MatDatepickerModule, MatNativeDateModule ]
    }).compileComponents(); 
  }));

  beforeEach(() => 
  {
    fixture = TestBed.createComponent(DatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    field = fixture.debugElement.query(By.css("#dateInput")).nativeElement;
    date = new Date(2019, 11, 12);
  });

  it('should create', () => expect(component).toBeTruthy());

  it("modifying the input value should raise the date change event", () => 
  {
    field.value = date.toString();
    let spy = spyOn(component.dateChanged, "emit");

    field.dispatchEvent(new Event("dateInput"));
    fixture.detectChanges();
    expect(component.selectedDate.toString()).toBe(date.toString());
    expect(spy.calls.mostRecent().args[0].toString()).toBe(date.toString());

    date = new Date(2018, 12, 12);
    field.value = date.toString();
    field.dispatchEvent(new Event("dateChange"));
    fixture.detectChanges();
    expect(component.selectedDate.toString()).toBe(date.toString());
    expect(spy.calls.mostRecent().args[0].toString()).toBe(date.toString());
  });

  it("changing the selected date updates the input", () => 
  {
    component.selectedDate = date;

    fixture.detectChanges();

    expect(field.value).toBe("12/12/2019");
  });

  it("DatePickerComponent has the correct default values", () => 
  {
    expect(component.minDate.toDateString()).toBe(minDate().toDateString());
    expect(component.maxDate.toDateString()).toEqual(maxDate().toDateString());
    expect(component.startDate.getDate()).toEqual(new Date().getDate());
    expect(component.startView).toBe("month");
  });
});