import { Subject } from 'rxjs';
import { StoreMock } from 'src/app/services/mocks/storeMock';
import { AuthenticationService } from './../../services/authentication/authentication.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderBarComponent } from './header-bar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthenticationServiceMock } from 'src/app/services/mocks/authenticationServiceMock';
import { Store } from '@ngrx/store';
import { getTitle } from 'src/app/redux/state';
import { By } from '@angular/platform-browser';

describe('HeaderBarComponent', () => 
{
  let component: HeaderBarComponent;
  let fixture: ComponentFixture<HeaderBarComponent>;
  let authenticationService: AuthenticationServiceMock;
  let store: StoreMock;
  let title: Subject<string>;

  beforeEach(async(() => 
  {
    title = new Subject<string>();
    store = new StoreMock();
    store.resultSelector = (selector) =>
    {
      if (selector == getTitle)
        return title;
      return null;
    }
    authenticationService = new AuthenticationServiceMock();
    TestBed.configureTestingModule(
    {
      declarations: [ HeaderBarComponent ],
      imports: [ MatMenuModule, MatToolbarModule ],
      providers: [
        { provide: AuthenticationService, useValue: authenticationService },
        { provide: Store, useValue: store }
      ]
    }).compileComponents();
  }));

  beforeEach(() => 
  {
    fixture = TestBed.createComponent(HeaderBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it("logout should log the user out", () => 
  { 
    component.logout();
    expect(authenticationService.wasLoggedOut).toBeTruthy();
  });

  it("displays the current title", () => 
  { 
    title.next("test-title");
    fixture.detectChanges();

    expect(component.title).toBe("test-title");
    let label = fixture.debugElement.query(By.css("#title")).nativeElement;
    expect(label.innerHTML).toContain("test-title");
  });
});
