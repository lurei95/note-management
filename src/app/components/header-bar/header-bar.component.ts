import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { getTitle, IApplicationState } from 'src/app/redux/state';
import { Store } from '@ngrx/store';
import { ComponentBase } from '../componentBase';
import { takeUntil } from 'rxjs/operators';

/**
 * Component for the header bar of the app
 */
@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent extends ComponentBase
{ 
  private _title: string = null;
  /**
   * @returns {string} The title to display in the bar
   */
  get title(): string { return this._title; }

  /**
   * Constructor
   *  
   * @param {AuthenticationService} authenticationService Injected: service for authentication matters 
   * @param {Store<IApplicationState>} store Injected: redux store
   */
  constructor(private authenticationService: AuthenticationService, store: Store<IApplicationState>) 
  { 
    super();
    store.select(getTitle).pipe(takeUntil(this.unsubscribe))
      .subscribe((x: string) => this._title = x);
  }

  /**
   * Logs the user out
   */
  logout() { this.authenticationService.logout(); }
}