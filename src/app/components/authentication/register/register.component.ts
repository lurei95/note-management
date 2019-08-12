import { AddUserService } from './../../../services/user/add-user.service';
import { LoginComponentBase } from './../loginComponentBase';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { LocalizationService } from 'src/app/services/localization.service';
import { AuthenticationErrorKind } from 'src/app/services/authentication/authenticationErrorKind';
import { MessageKind } from 'src/app/messageKind';
import { UserModel } from 'src/app/models/users/userModel';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./../login.component.css']
})
export class RegisterComponent extends LoginComponentBase
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
    formBuilder: FormBuilder, private localizationservice: LocalizationService, 
    private addService: AddUserService) 
  { super(authenticationService, router, formBuilder); }

  /**
   * Tries to register a new user with email and password
   * 
   * @param parameter Parameter containing email and password
   */
  tryRegister(parameter: {email: string, password: string})
  {
    this._showWaitPanel = true;
    this.authenticationService.registerWithEmail(parameter.email, parameter.password)
      .then(() => this.onSuccessfulAuthentication(), err => this.handleError(err));
  }

  /**
   * Handles a successful registration
   */
  onSuccessfulAuthentication()
  {
    super.onSuccessfulAuthentication();
    this.authenticationService.getUser()
      .then((user) => this.addService.execute(new UserModel(user)));
  }

  private handleError(error: any)
  {
    this._showWaitPanel = false;
    this._errorMessage = null;
    if (error.code == null)
      return;

    if (error.code == AuthenticationErrorKind.InvalidEmail)
      this._errorMessage = this.localizationservice.execute(MessageKind.Login_InvalidEmail);
    else if (error.code == AuthenticationErrorKind.WeakPassword)
      this._errorMessage = this.localizationservice.execute(MessageKind.Login_WeakPassword);
    else if (error.code == AuthenticationErrorKind.EmailAlreadyInUse)
      this._errorMessage = this.localizationservice.execute(MessageKind.Login_UserAlreadyExsits);
    else   
      this._errorMessage = error.message;
  }
}