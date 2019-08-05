import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WaitPanelComponent } from './wait-panel.component';
import { By } from '@angular/platform-browser';

describe('WaitPanelComponent', () => 
{
  let component: WaitPanelComponent;
  let fixture: ComponentFixture<WaitPanelComponent>;

  beforeEach(async(() => 
  {
    TestBed.configureTestingModule(
    {
      declarations: [ WaitPanelComponent ],
      imports: [ MatProgressSpinnerModule ]
    }).compileComponents();
  }));

  beforeEach(() => 
  {
    fixture = TestBed.createComponent(WaitPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it("shows wait indicator when show is true", () => 
  {
    component.show = true;
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css("mat-progress-spinner"))).toBeTruthy(); 
  });

  it("does not show wait indicator when show is false", () => 
  {
    component.show = false;
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css("mat-progress-spinner"))).toBeNull(); 
  });
});
