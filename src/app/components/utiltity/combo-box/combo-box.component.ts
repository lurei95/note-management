import { LocalizationService } from 'src/app/services/localization.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ComponentBase } from '../../componentBase';

/**
 * Component for combobox
 */
@Component({
  selector: 'app-combo-box',
  templateUrl: './combo-box.component.html',
  styleUrls: ['./combo-box.component.css']
})
export class ComboBoxComponent extends ComponentBase
{
  private _options: {editValue: string, displayValue: string}[] = [];
  /**
   * @returns {{editValue: string, displayValue: string}[]} The selectable options of the ComboBox
   */
  get options(): { editValue: string, displayValue: string; }[] { return this._options; }

  /**
   * @param {any} value The type of the enum used for generating the selectable options 
   */
  @Input() set enumType(value: any)
  {
    Object.keys(value).forEach(key => 
    {
      let isNumber = parseInt(key, 10) >= 0
      if (!isNumber)
        this._options.push({editValue: key, displayValue: this.localizationService.execute(key)});
    });
  }

  private _selectedValue: string;
  /**
   * @returns {string} The selected value
   */
  get selectedValue(): string { return this._selectedValue; }
  /**
   * @param {string} value The selected value
   */
  @Input() set selectedValue(value: string) 
  { 
    if (this._selectedValue != value)
    {
      this._selectedValue = value;
      this.selectedValueChanged.emit(value);
    }
  }

  /**
   * Selected value changed event
   */
  @Output() selectedValueChanged = new EventEmitter<string>();

  /**
   * Constructor
   * 
   * @param {LocalizationService} localizationService Injected: service for providing localized strings
   */
  constructor(private localizationService: LocalizationService) { super();}
}
