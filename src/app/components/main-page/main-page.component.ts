import { Component } from '@angular/core';
import { ComponentBase } from '../componentBase';

/**
 * Component for the main page
 */
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent extends ComponentBase
{ 
  private _sidebarExpanded: boolean = true;
  /**
   * Returns whether the sidebar is expanded
   */
  public get sidebarExpanded() : boolean { return this._sidebarExpanded; }
  /**
   * Sets whether the sidebar is expanded
   */
  public set sidebarExpanded(value : boolean) { this._sidebarExpanded = value; }
}