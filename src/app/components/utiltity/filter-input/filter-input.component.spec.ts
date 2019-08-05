import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterInputComponent as FilterInputComponent } from './filter-input.component';
import { By } from '@angular/platform-browser';

describe('FilterInputComponent', () =>
{
  let component: FilterInputComponent;
  let fixture: ComponentFixture<FilterInputComponent>;
  let field: HTMLInputElement;

  beforeEach(async(() => 
  { TestBed.configureTestingModule({ declarations: [ FilterInputComponent ] }).compileComponents(); }));

  beforeEach(() => 
  {
    fixture = TestBed.createComponent(FilterInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    field = fixture.debugElement.query(By.css(".input")).nativeElement;
  });

  it('should create', () => expect(component).toBeTruthy());

  it("modifiying the input value should raise the text change event", () => 
  {
    field.value = "filterText";
    spyOn(component.textChanged, "emit");

    field.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    expect(component.filterText).toBe("filterText");
    expect(component.textChanged.emit).toHaveBeenCalledWith("filterText");
  });

  it("changing the filter text updates the input", () => 
  {
    component.filterText = "filterText";

    fixture.detectChanges();

    expect(field.value).toBe("filterText");
  });
});
