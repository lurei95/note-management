/**
 * Kind of error occured during authentication
 */
export enum AuthenticationErrorKind 
{
  /**
   * User does not exist
   */
  UserNotFound = "auth/user-not-found",
  /**
   * The email is invalid
   */
  InvalidEmail = "auth/invalid-email",
  /**
   * Wrong password for the user
   */
  WrongPassword = "auth/wrong-password",
  /**
   * Password to short
   */
  WeakPassword = "auth/weak-password",
  /**
   * User with email already exists
   */
  EmailAlreadyInUse = "auth/email-already-in-use"
}