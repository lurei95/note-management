import { Component, Input, Output, EventEmitter } from '@angular/core';
import { minDate, maxDate } from '../../../util/utility';
import { ComponentBase } from '../../componentBase';

/**
 * Component for a date picker
 */
@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent extends ComponentBase
{
  private _selectedDate: Date;
  /**
   * @param {Date} value The currently selected Date
   */
  @Input()
  set selectedDate(value: Date) { this._selectedDate = value; }
  /**
   * @returns {Date} The currently selected Date
   */
  get selectedDate() : Date { return this._selectedDate; }

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

  private _minDate: Date = minDate();
  /**
   * @param {Date} value The start date of the date picker
   */
  @Input() 
  set minDate(value: Date) { this._minDate = value; }
  /**
   * @returns {Date} The start date of the date picker
   */
  get minDate(): Date { return this._minDate; }

  private _maxDate: Date = maxDate();
  /**
   * @param {Date} value The start date of the date picker
   */
  @Input() 
  set maxDate(value: Date) { this._maxDate = value; }
  /**
   * @returns {Date} The start date of the date picker
   */
  get maxDate(): Date { return this._maxDate; }

  private _startView: string = "month";
  /**
   * @param {string} value The start view of the date picker
   */
  @Input() 
  set startView(value: string) { this._startView = value; }
  /**
   * @returns {string} The start view of the date picker
   */
  get startView(): string { return this._startView; }

  /**
   * Date change event
   */
  @Output() dateChanged = new EventEmitter<Date>();

  /**
   * Event handler: fires datze change event
   */
  handleDateChange(dateText: string) 
  { 
    let date = Date.parse(dateText);
    if(!isNaN(date))
    {
      this.selectedDate = new Date(dateText);
      this.dateChanged.emit(this.selectedDate); 
    }
  }
}