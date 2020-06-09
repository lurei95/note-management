import { IApplicationState } from '../../redux/state';
import { Store } from '@ngrx/store';
import { User } from 'firebase';
import { UserChangeAction } from '../../redux/actions/user/userChangeAction';
import { UserModel } from '../../models/users/userModel';
import { AngularFireAuth } from '@angular/fire/auth';

/**
 * Class for observing changes to the current user
 */
export class UserObserver
{
  /**
   * Constructors
   * 
   * @param {Store<IApplicationState>} store Injected: redux store
   * @param {AngularFireAuth} authentication Injected: authentication provider for firebase
   */
  constructor(private store: Store<IApplicationState>, private authentication: AngularFireAuth) { }

  /**
   * Starts the observation process
   */
  startObserving()
  {
    this.authentication.auth.onAuthStateChanged((user: User) => 
    { 
      if (user != null)
        this.store.dispatch(new UserChangeAction(new UserModel(user)));
      else
        this.store.dispatch(new UserChangeAction(null));      
    });
  }
}