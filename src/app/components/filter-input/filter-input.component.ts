import { Component, Output, EventEmitter } from '@angular/core';

/**
 * Component for a filter input
 */
@Component({
  selector: 'app-filter-input',
  templateUrl: './filter-input.component.html',
  styleUrls: ['./filter-input.component.css']
})
export class FilterInputComponent
{
  /**
   * Text change event
   */
  @Output() textChanged = new EventEmitter<string>();

  /**
   * Event handler: changes the search text in the search settings
   * 
   * @param {string} filterText The new search text
   */
  handleFilterTextChange(filterText: string) { this.textChanged.emit(filterText); }
}
