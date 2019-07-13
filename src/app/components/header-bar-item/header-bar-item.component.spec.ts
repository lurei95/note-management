import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderBarItemComponent } from './header-bar-item.component';

describe('HeaderBarItemComponent', () => {
  let component: HeaderBarItemComponent;
  let fixture: ComponentFixture<HeaderBarItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderBarItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderBarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
