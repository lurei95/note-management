import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from "@angular/router";
import * as firebase from 'firebase';

/**
 * Guard that secures that nobdy can navigate to the login pages if they are already logged in
 */
@Injectable()
export class LoginGuard implements CanActivate 
{
  /**
   * Constructor
   * 
   * @param {Router} router Injected: Router for routing
   */
  constructor(private router: Router) 
  { }

  /**
   * Tests if the user can navigate to login pages
   * 
   * @returns {Promise<any>} True if user is not logged in and redirect to home page otherwise
   */
  canActivate(): Promise<boolean | UrlTree>
  {
    return new Promise<any>((resolve) => 
    {
      firebase.auth().onAuthStateChanged(user =>
      {
        if (user) 
          return resolve(this.router.parseUrl('/home')); 
        else 
          return resolve(true);
      });
    });
  }
} 