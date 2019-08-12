import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ComponentBase } from '../../componentBase';

/**
 * Component for a filter input
 */
@Component({
  selector: 'app-filter-input',
  templateUrl: './filter-input.component.html',
  styleUrls: ['./filter-input.component.css']
})
export class FilterInputComponent extends ComponentBase
{
  private _filterText: string = null;
  /**
   * @returns {string} The filter text
   */
  get filterText(): string { return this._filterText; }
  /**
   * @param {string} value The filter text
   */
  @Input() set filterText(value: string) { this._filterText = value; }

  /**
   * Text change event
   */
  @Output() textChanged = new EventEmitter<string>();

  /**
   * Event handler: changes the search text in the search settings
   * 
   * @param {string} filterText The new search text
   */
  handleFilterTextChange(filterText: string) 
  { 
    this.filterText = filterText;
    this.textChanged.emit(filterText); 
  }
}