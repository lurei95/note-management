import { LoginComponentBase } from './loginComponentBase';
import { AuthenticationServiceMock } from 'src/app/services/mocks/authenticationServiceMock';
import { RouterMock } from 'src/app/services/mocks/routerMock';
import { FormBuilder } from '@angular/forms';

describe('LoginComponentBase', () =>
{
  class TestLoginComponent extends LoginComponentBase
  { }

  let component: TestLoginComponent;
  let authenticationService: AuthenticationServiceMock;
  let router: RouterMock;

  beforeEach(() =>
  {
    authenticationService = new AuthenticationServiceMock();
    authenticationService.result = true;
    router = new RouterMock();
    component = new TestLoginComponent(authenticationService, (router as any), new FormBuilder());
  });

  it("tryFacebookLogin calls the authentication service", () =>
  {
    let spy = spyOn(authenticationService, "loginWithFacebook").and.returnValue(Promise.resolve());
    component.tryFacebookLogin();
    expect(spy).toHaveBeenCalled();
  });

  it("tryTwitterLogin calls the authentication service", () =>
  {
    let spy = spyOn(authenticationService, "loginWithTwitter").and.returnValue(Promise.resolve());
    component.tryTwitterLogin();
    expect(spy).toHaveBeenCalled();
  });

  it("tryGoogleLogin calls the authentication service", () =>
  {
    let spy = spyOn(authenticationService, "loginWithGoogle").and.returnValue(Promise.resolve());
    component.tryGoogleLogin();
    expect(spy).toHaveBeenCalled();
  });

  it("does navigate to home page when authentication successful", () =>
  {
    (component as any).onSuccessfulAuthentication()
    expect(router.urlParameter).toBe("/home");
  });
});