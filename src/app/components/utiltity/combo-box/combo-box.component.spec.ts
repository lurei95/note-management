import { By } from '@angular/platform-browser';
import { LocalizationService } from '../../../services/localization.service';
import { LocalizationServiceMock } from '../../../services/mocks/localizationServiceMock';
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ComboBoxComponent } from './combo-box.component';
import { MatSelectModule, MatSelect } from '@angular/material/select';
import { DebugElement } from '@angular/core';

describe('ComboBoxComponent', () => 
{
  let component: ComboBoxComponent;
  let fixture: ComponentFixture<ComboBoxComponent>;
  let localizationService: LocalizationServiceMock;
  let field: MatSelect;

  enum TestEnum
  {
    Test1 = "Test1",
    Test2 = "Test2",
    Test3 = "Test3"
  }

  beforeEach(async(() => 
  {
    localizationService = new LocalizationServiceMock();
    TestBed.configureTestingModule({
      imports: [ MatSelectModule ],
      declarations: [ ComboBoxComponent ],
      providers: [{ provide: LocalizationService, useValue: localizationService }]
    }).compileComponents();
  }));

  beforeEach(() => 
  {
    fixture = TestBed.createComponent(ComboBoxComponent);
    localizationService.returnValue = "test123";
    component = fixture.componentInstance;
    component.enumType = TestEnum;
    fixture.detectChanges();
    field = fixture.debugElement.query(By.css("mat-select")).nativeElement;
    console.log(fixture.debugElement.nativeElement.innerHTML);
    console.log(component.options);
  });

  it('should create', () => expect(component).toBeTruthy());

  it("modifying the input value should raise the selected value changed event", () => 
  {
    let spy = spyOn(component.selectedValueChanged, "emit");
    component.selectedValue = "test";

    expect(spy.calls.mostRecent().args[0]).toBe("test");
  });

  it("generates an option for each enum member", () => 
  {
    expect(component.options.length).toBe(3);
    expect(component.options[0].editValue).toBe("Test1");
    expect(component.options[0].displayValue).toBe("test123");
    expect(component.options[1].editValue).toBe("Test2");
    expect(component.options[1].displayValue).toBe("test123");
    expect(component.options[2].editValue).toBe("Test3");
    expect(component.options[2].displayValue).toBe("test123");
  });
});
