import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { auth } from 'firebase/app';

/**
 * Service for handling authentication matters
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService 
{
  /**
   * Constructor
   * 
   * @param {AngularFireAuth} authentication Injected: authentication provider for firebase
   * @param {Router} router Injected: router for navigating
   */
  constructor(private authentication: AngularFireAuth, private router: Router) { }

  /**
   * Gets the current user
   * 
   * @returns {Promise<User>} The current user
   */
  getUser(): Promise<{uid: string, email:string}>
  {
    return new Promise<{uid: string, email:string}>((resolve) => 
    { this.authentication.user.pipe(take(1)).subscribe(user => resolve(user)); });
  }

  /**
   * Registers a new user with an email and a password
   * 
   * @param {string} email Email of the new user
   * @param {string} password Password of the new user
   * @returns {Promise<any>} The registration result
   */
  registerWithEmail(email: string, password: string): Promise<any>
  {
    return new Promise<any>((resolve, reject) => 
    {
      auth().createUserWithEmailAndPassword(email, password)
        .then(res => resolve(res), err => reject(err));
    });
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
    return new Promise<any>((resolve, reject) => 
    {
      auth().signInWithEmailAndPassword(email, password)
        .then(res => resolve(res), err => reject(err));
    });
  }

  /**
   * Logs a user in using their facebook account
   * 
   * @returns {Promise<any>} The login result
   */
  loginWithFacebook(): Promise<any>
  {
    return new Promise<any>((resolve, reject) => 
    {
      let provider = new auth.FacebookAuthProvider();
      this.authentication.auth.signInWithPopup(provider)
        .then(res => resolve(res), err => reject(err));
    });
  }

  /**
   * Logs a user in using their google account
   * 
   * @returns {Promise<any>} The login result
   */
  loginWithGoogle(): Promise<any>
  {
    return new Promise<any>((resolve, reject) => 
    {
      let provider = new auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.authentication.auth.signInWithPopup(provider)
        .then(res => resolve(res), err => reject(err));
    });
  }

  /**
   * Logs a user in using their twitter account
   * 
   * @returns {Promise<any>} The login result
   */
  loginWithTwitter(): Promise<any>
  {
    return new Promise<any>((resolve, reject) => 
    {
      let provider = new auth.TwitterAuthProvider();
      this.authentication.auth.signInWithPopup(provider)
        .then(res => resolve(res), err =>  reject(err));
    });
  }

  /**
   * Logs out the user
   */
  logout() 
  { 
    this.authentication.auth.signOut(); 
    this.router.navigateByUrl("/login");
  }
}