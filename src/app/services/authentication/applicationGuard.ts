import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from "@angular/router";
import { AuthenticationService } from './authentication.service';

/**
 * Guard that secures that nobdy can navigate to the application without being logged in
 */
@Injectable()
export class ApplicationGuard implements CanActivate 
{
  /**
   * Constructor
   * 
   * @param {Router} router Injected: Router for routing
   * @param {AuthenticationService} authenticationService Injected: service for handling authentication matters
   */
  constructor(private router: Router, private authenticationService: AuthenticationService) 
  { }

  /**
   * Tests if the user can navigate to main application routes
   * 
   * @returns {Promise<any>} True if user logged in and redirect to login page otherwise
   */
  canActivate(): Promise<boolean | UrlTree>
  {
    return new Promise<any>((resolve) => 
    {
      this.authenticationService.getUser().then(user => 
      {
        if (user != null)
          return resolve(true);
        else 
          return resolve(this.router.parseUrl('/login'));
      })
    });
  }
}