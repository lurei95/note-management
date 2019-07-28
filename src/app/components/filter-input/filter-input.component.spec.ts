import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterInputComponent as FilterInputComponent } from './filter-input.component';
import { By } from '@angular/platform-browser';

describe('FilterInputComponent', () =>
{
  let component: FilterInputComponent;
  let fixture: ComponentFixture<FilterInputComponent>;

  beforeEach(async(() => 
  { TestBed.configureTestingModule({ declarations: [ FilterInputComponent ] }).compileComponents(); }));

  beforeEach(() => 
  {
    fixture = TestBed.createComponent(FilterInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it("modifiying the input value should raise the text change event", () => 
  {
    let field: HTMLInputElement = fixture.debugElement.query(By.css(".input")).nativeElement;
    field.value = "filterText";
    spyOn(component.textChanged, "emit");

    field.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    expect(component.textChanged.emit).toHaveBeenCalledWith("filterText");
  })
});
