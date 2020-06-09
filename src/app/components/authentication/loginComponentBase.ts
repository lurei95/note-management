import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { ComponentBase } from '../componentBase';

/**
 * Base class for a login components
 */
export class LoginComponentBase extends ComponentBase
{
  private _formGroup: FormGroup;
  /**
   * @returns {FormGroup} Form group
   */
  get formGroup(): FormGroup { return this._formGroup; }

  /**
   * @returns {AuthenticationService} Service for handling authentication matters
   */
  protected get authenticationService(): AuthenticationService { return this._authenticationService; }

  /**
   * Whether the waitpanel should be displayed
   */
  protected _showWaitPanel: boolean = false;
  /**
   * @returns {boolean} Whether the waitpanel should be displayed
   */
  get showWaitPanel(): boolean { return this._showWaitPanel; }

  /**
   * The error message
   */
  protected _errorMessage: string = null;
  /**
   * @returns {string} The error message
   */
  get errorMessage(): string { return this._errorMessage; }

  /**
   * Constructor
   * 
   * @param {AuthenticationService} _authenticationService Injected: service for authentication means
   * @param {Router} router Injected: angular router
   * @param {FormBuilder} formBuilder Injected: from builder
   */
  constructor(private _authenticationService: AuthenticationService, private router: Router,
    private formBuilder: FormBuilder) 
  { 
    super();
    this.createForm(); 
  }

  /**
   * Tries to log in with facebook account
   */
  tryFacebookLogin()
  { this.authenticationService.loginWithFacebook().then(() => this.onSuccessfulAuthentication()); }

  /**
   * Tries to log in with twitter account
   */
  tryTwitterLogin()
  { this.authenticationService.loginWithTwitter().then(() => this.onSuccessfulAuthentication()); }

  /**
   * Tries to log in with google account
   */
  tryGoogleLogin()
  { this.authenticationService.loginWithGoogle().then(() => this.onSuccessfulAuthentication()); }

  /**
   * Handles a successful login/registration
   */
  protected onSuccessfulAuthentication() 
  { 
    this._showWaitPanel = false;
    this.router.navigateByUrl('/home'); 
  }

  private createForm() 
  {
    this._formGroup = this.formBuilder.group(
    {
      email: ['', Validators.required ],
      password: ['', Validators.required]
    });
  }
}