import { Component, Input } from '@angular/core';

/**
 * Component for a wait panel
 */
@Component({
  selector: 'app-wait-panel',
  templateUrl: './wait-panel.component.html',
  styleUrls: ['./wait-panel.component.css']
})
export class WaitPanelComponent 
{
  private _show: boolean = false;
  /**
   * @returns {boolean} If the wait indicator should be shown
   */
  get show(): boolean { return this._show; }
  /**
   * @param {boolean} value If the wait indicator should be shown
   */
  @Input() set show(value: boolean) { this._show = value; }
}
