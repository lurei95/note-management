import { UserModel } from './../../../models/users/userModel';
import { AddUserService } from './../../../services/user/add-user.service';
import { LocalizationServiceMock } from './../../../services/mocks/localizationServiceMock';
import { LocalizationService } from 'src/app/services/localization.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './../../../services/authentication/authentication.service';
import { WaitPanelComponent } from './../../utiltity/wait-panel/wait-panel.component';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthenticationServiceMock } from 'src/app/services/mocks/authenticationServiceMock';
import { RouterMock } from 'src/app/services/mocks/routerMock';
import { Router } from '@angular/router';
import { RegisterComponent } from './register.component';
import { AuthenticationErrorKind } from 'src/app/services/authentication/authenticationErrorKind';
import { MessageKind } from 'src/app/messageKind';
import { By } from '@angular/platform-browser';
import { TranslatePipeMock } from 'src/app/services/mocks/translatePipeMock';

describe('RegisterComponent', () => 
{
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authenticationService: AuthenticationServiceMock;
  let localizationService: LocalizationServiceMock
  let spy: jasmine.Spy<any>;
  let addUserService = { execute(user: { id: string, email: string }): any { return user; } };
  let router: RouterMock;

  beforeEach(async(() => 
  {
    authenticationService = new AuthenticationServiceMock();
    authenticationService.result = true;
    authenticationService.user = { uid: "1", email: "test@test.com" };
    localizationService = new LocalizationServiceMock();
    localizationService.returnValue = "test";
    router = new RouterMock();
    spy = spyOn<any>(addUserService, "execute");
    TestBed.configureTestingModule(
    {
      declarations: [ RegisterComponent, WaitPanelComponent, TranslatePipeMock ],
      imports: [ MatToolbarModule, MatProgressSpinnerModule, ReactiveFormsModule, FormsModule ],
      providers: [
        { provide: AuthenticationService, useValue: authenticationService},
        { provide: Router, useValue: router},
        { provide: LocalizationService, useValue: localizationService},
        FormBuilder,
        TranslatePipeMock,
        { provide: AddUserService, useValue: addUserService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => 
  {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it("tryRegister calls the authentication service", () =>
  {
    component.tryRegister({ email: "test@test.com", password: "test123" });

    expect(authenticationService.email).toBe("test@test.com");
    expect(authenticationService.password).toBe("test123");
  });

  it("successful registration creates a new user", fakeAsync(() =>
  {
    component.onSuccessfulAuthentication();

    tick();
    fixture.detectChanges();

    let user = spy.calls.first().args[0] as UserModel;
    expect(user.id).toBe("1");
    expect(user.email).toBe("test@test.com");
  }));

  it("tryRegister sets the correct error message for invalid email", fakeAsync(() =>
  { errorMessageTestCore(AuthenticationErrorKind.InvalidEmail, MessageKind.Login_InvalidEmail); }));

  it("tryRegister sets the correct error message for waek password", fakeAsync(() =>
  { errorMessageTestCore(AuthenticationErrorKind.WeakPassword, MessageKind.Login_WeakPassword); }));

  it("tryRegister sets the correct error message for user already exists", fakeAsync(() =>
  { 
    errorMessageTestCore(AuthenticationErrorKind.EmailAlreadyInUse, 
      MessageKind.Login_UserAlreadyExsits); 
  }));

  function errorMessageTestCore(errorCode: AuthenticationErrorKind, messageKind: MessageKind)
  {
    authenticationService.shouldFail = true;
    authenticationService.result = { code: errorCode}
    component.tryRegister({ email: "test@test.com", password: "test123" });

    tick();
    fixture.detectChanges();
    let label = fixture.debugElement.query(By.css(".errorLabel")).nativeElement; 

    expect(localizationService.names).toContain(messageKind);
    expect(component.errorMessage).toBe("test");
    expect(label.innerHTML).toContain("test");
  }
});