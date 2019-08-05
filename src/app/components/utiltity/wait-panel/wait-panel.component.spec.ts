import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitPanelComponent } from './wait-panel.component';

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
});
