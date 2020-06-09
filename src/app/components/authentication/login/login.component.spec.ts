import { MessageKind } from '../../../messageKind';
import { AuthenticationErrorKind } from './../../../services/authentication/authenticationErrorKind';
import { LocalizationServiceMock } from './../../../services/mocks/localizationServiceMock';
import { LocalizationService } from '../../../services/localization.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './../../../services/authentication/authentication.service';
import { WaitPanelComponent } from './../../utiltity/wait-panel/wait-panel.component';
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthenticationServiceMock } from '../../../services/mocks/authenticationServiceMock';
import { RouterMock } from '../../../services/mocks/routerMock';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { TranslatePipeMock } from '../../../services/mocks/translatePipeMock';

describe('LoginComponent', () => 
{
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authenticationService: AuthenticationServiceMock;
  let localizationService: LocalizationServiceMock
  let router: RouterMock;

  beforeEach(async(() => 
  {
    authenticationService = new AuthenticationServiceMock();
    authenticationService.result = true;
    localizationService = new LocalizationServiceMock();
    localizationService.returnValue = "test";
    router = new RouterMock();
    TestBed.configureTestingModule(
    {
      declarations: [ LoginComponent, WaitPanelComponent, TranslatePipeMock ],
      imports: [ MatToolbarModule, MatProgressSpinnerModule, ReactiveFormsModule, FormsModule ],
      providers: [
        {provide: AuthenticationService, useValue: authenticationService},
        {provide: Router, useValue: router},
        {provide: LocalizationService, useValue: localizationService},
        FormBuilder,
        TranslatePipeMock
      ]
    }).compileComponents();
  }));

  beforeEach(() => 
  {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it("tryLogin calls the authentication service", () =>
  {
    component.tryLogin({ email: "test@test.com", password: "test123" });

    expect(authenticationService.email).toBe("test@test.com");
    expect(authenticationService.password).toBe("test123");
  });

  it("tryLogin sets the correct error message for invalid email", fakeAsync(() =>
  { errorMessageTestCore(AuthenticationErrorKind.InvalidEmail, MessageKind.Login_InvalidEmail); }));

  it("tryLogin sets the correct error message for user not found", fakeAsync(() =>
  { 
    errorMessageTestCore(AuthenticationErrorKind.UserNotFound, 
      MessageKind.Login_InvalidEmailOrPassword);
  }));

  it("tryLogin sets the correct error message for wrong password", fakeAsync(() =>
  { errorMessageTestCore(AuthenticationErrorKind.WrongPassword, MessageKind.Login_WrongPassword); }));

  function errorMessageTestCore(errorCode: AuthenticationErrorKind, messageKind: MessageKind)
  {
    authenticationService.shouldFail = true;
    authenticationService.result = { code: errorCode}
    component.tryLogin({ email: "test@test.com", password: "test123" });

    tick();
    fixture.detectChanges();
    let label = fixture.debugElement.query(By.css(".errorLabel")).nativeElement; 

    expect(localizationService.names).toContain(messageKind);
    expect(component.errorMessage).toBe("test");
    expect(label.innerHTML).toContain("test");
  }
});