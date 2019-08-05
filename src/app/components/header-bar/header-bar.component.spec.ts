import { AuthenticationService } from './../../services/authentication/authentication.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderBarComponent } from './header-bar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthenticationServiceMock } from 'src/app/services/mocks/authenticationServiceMock';

describe('HeaderBarComponent', () => 
{
  let component: HeaderBarComponent;
  let fixture: ComponentFixture<HeaderBarComponent>;
  let authenticationService: AuthenticationServiceMock;

  beforeEach(async(() => 
  {
    authenticationService = new AuthenticationServiceMock();
    TestBed.configureTestingModule(
    {
      declarations: [ HeaderBarComponent ],
      imports: [ MatMenuModule, MatToolbarModule ],
      providers: [{ provide: AuthenticationService, useValue: authenticationService}]
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
});
