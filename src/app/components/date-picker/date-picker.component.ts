import { Component, Input } from '@angular/core';

/**
 * Component for a date picker
 */
@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent
{
  private _startDate: Date = new Date();
  /**
   * @param {Date} value The start date of the date picker
   */
  @Input() 
  set startDate(value: Date) { this._startDate = value; }
  /**
   * @returns {Date} The start date of the date picker
   */
  get startDate(): Date { return this._startDate; }
}