import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DatePickerComponent } from './date-picker.component';
import {  MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { minDate, maxDate } from 'src/app/util/utility';

describe('DatePickerComponent', () =>
{
  let component: DatePickerComponent;
  let fixture: ComponentFixture<DatePickerComponent>;

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
  });

  it('should create', () => expect(component).toBeTruthy());

  it("modifying the input value should raise the date change event", () => 
  {
    let field: HTMLInputElement = fixture.debugElement.query(By.css("#dateInput")).nativeElement;
    let date = new Date(2019, 12, 12);
    field.value = date.toString();
    let spy = spyOn(component.dateChanged, "emit");

    field.dispatchEvent(new Event("dateInput"));
    fixture.detectChanges();
    expect(spy.calls.mostRecent().args[0].toString()).toBe(date.toString());

    date = new Date(2018, 12, 12);
    field.value = date.toString();
    field.dispatchEvent(new Event("dateChange"));
    fixture.detectChanges();
    expect(spy.calls.mostRecent().args[0].toString()).toBe(date.toString());
  });

  it("changing the selected date updates the input", () => 
  {
    let field: HTMLInputElement = fixture.debugElement.query(By.css("#dateInput")).nativeElement;
    let date = new Date(2019, 11, 12);
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