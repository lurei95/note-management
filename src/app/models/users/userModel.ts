import { User } from 'firebase';

/**
 * Model for a user
 */
export class UserModel
{
  private _id: string;
  /**
   * @returns {string} ID of the user
   */
  get id(): string { return this._id; }

  private _email: string;
  /**
   * @returns {string} E-mail address of the user
   */
  get email(): string { return this._email; }
  /**
   * @param {string} value E-mail address of the user
   */
  set email(value: string) { this._email = value; }

  /**
   * Constructor
   * 
   * @param {{ uid: string, email: string }} user Firebase user 
   */
  constructor(user?: { uid: string, email: string })
  {
    if (user != null)
    {
      this._id = user.uid;
      this.email = user.email;
    }
  }
}