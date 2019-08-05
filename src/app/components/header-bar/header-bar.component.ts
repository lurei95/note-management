import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

/**
 * Component for the header bar of the app
 */
@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent 
{ 
  constructor(private authenticationService: AuthenticationService) { }

  logout() { this.authenticationService.logout(); }
}