import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationErrorKind } from 'src/app/services/authentication/authenticationErrorKind';
import { MessageKind } from 'src/app/messageKind';
import { LocalizationService } from 'src/app/services/localization.service';
import { Router } from '@angular/router';
import { LoginComponentBase } from '../loginComponentBase';

/**
 * Component for a login page
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./../login.component.css']
})
export class LoginComponent extends LoginComponentBase
{
  /**
   * Constructor
   * 
   * @param {AuthenticationService} authenticationService Injected: service for auithentication matters
   * @param {Router} router Injected: router for navigating
   * @param {FormBuilder} formBuilder Injected form builder
   * @param {LocalizationService} localizationservice Injected: service for providing localized strings
   */
  constructor(authenticationService: AuthenticationService, router: Router,
    formBuilder: FormBuilder, private localizationservice: LocalizationService) 
  { super(authenticationService, router, formBuilder); }

  /**
   * Tries to log in with email and password
   * 
   * @param parameter Parameter containing email and password
   */
  tryLogin(parameter: {email: string, password: string})
  {
    this._showWaitPanel = true;
    this.authenticationService.loginWithEmail(parameter.email, parameter.password)
      .then(() => this.onSuccessfulAuthentication(), err => this.handleError(err));
  }

  private handleError(error: any)
  {
    this._showWaitPanel = false;
    this._errorMessage = null;
    if (error.code == null)
      return;

    if (error.code == AuthenticationErrorKind.UserNotFound)
      this._errorMessage = this.localizationservice.execute(MessageKind.Login_InvalidEmailOrPassword);
    else if (error.code == AuthenticationErrorKind.InvalidEmail)
      this._errorMessage = this.localizationservice.execute(MessageKind.Login_InvalidEmail);
    else if (error.code == AuthenticationErrorKind.WrongPassword)
      this._errorMessage = this.localizationservice.execute(MessageKind.Login_WrongPassword);
    else
      this._errorMessage = error.message;
  }
}