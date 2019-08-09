import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';

/**
 * Service for handling authentication matters
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceMock extends AuthenticationService
{
  /**
   * The email passed as a parameter to the service
   */
  email: string;
  /**
   * The password passed as a parameter to the service
   */
  password: string;
  /**
   * The result a service call should return
   */
  result: any;
  /**
   * Whether the call should fail
   */
  shouldFail: boolean = false;
  /**
   * If the user was logged out
   */
  wasLoggedOut: boolean;
  /**
   * The user the service should retrun
   */
  user: {uid: string, email:string}

  /**
   * Constructor
   */
  constructor() { super(null, null); }

  /**
   * Gets the current user
   * 
   * @returns {Promise<{uid: string, email:string}>} The current user
   */
  getUser(): Promise<{uid: string, email:string}>
  { return Promise.resolve(this.user); }

  /**
   * Registers a new user with an email and a password
   * 
   * @param {string} email Email of the new user
   * @param {string} password Password of the new user
   * @returns {Promise<any>} The registration result
   */
  registerWithEmail(email: string, password: string): Promise<any>
  {
    this.email = email;
    this.password = password;
    if (this.shouldFail)
      return Promise.reject(this.result);
    else
      return Promise.resolve(this.result);
  }

  /**
   * Logs a user in using email and a password
   * 
   * @param {string} email Email of the user
   * @param {string} password Password of the user
   * @returns {Promise<any>} The login result
   */
  loginWithEmail(email: string, password: string): Promise<any>
  {
    this.email = email;
    this.password = password;
    if (this.shouldFail)
      return Promise.reject(this.result);
    else
      return Promise.resolve(this.result);
  }

  /**
   * Logs a user in using their facebook account
   * 
   * @returns {Promise<any>} The login result
   */
  loginWithFacebook(): Promise<any>
  { return new Promise<any>((resolve) => resolve(this.result)); }

  /**
   * Logs a user in using their google account
   * 
   * @returns {Promise<any>} The login result
   */
  loginWithGoogle(): Promise<any>
  { return new Promise<any>((resolve) => resolve(this.result)); }

  /**
   * Logs a user in using their twitter account
   * 
   * @returns {Promise<any>} The login result
   */
  loginWithTwitter(): Promise<any>
  { return new Promise<any>((resolve) => resolve(this.result)); }

  /**
   * Logs out the user
   */
  logout() { this.wasLoggedOut = true; }
}