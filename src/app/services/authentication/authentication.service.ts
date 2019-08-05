import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

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
      firebase.auth().createUserWithEmailAndPassword(email, password)
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
      firebase.auth().signInWithEmailAndPassword(email, password)
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
      let provider = new firebase.auth.FacebookAuthProvider();
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
      let provider = new firebase.auth.GoogleAuthProvider();
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
      let provider = new firebase.auth.TwitterAuthProvider();
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