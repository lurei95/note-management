import { Component, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { nullOrEmpty } from '../../../util/utility';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { ComponentBase } from '../../componentBase';

/**
 * Component for a list of tags
 */
@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css']
})
export class TagListComponent extends ComponentBase
{
  @ViewChild("tagInput", {static: false}) private tagInput: ElementRef;

  /**
   * Seperator key codes for the tag input
   */
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  private _maxTagLength: number = 20;
  /**
   * @returns {number} The maximum number of characters a tag can have 
   */
  get maxTagLength(): number { return this._maxTagLength; }
  /**
   * @param {number} value The maximum number of characters a tag can have 
   */
  @Input() set maxTagLength(value: number) 
  { 
    this._maxTagLength = value;
    this.tagInput.nativeElement.maxLength = value;
  }

  private _maxTagCount: number = 15;
  /**
   * @returns {number} The maximum number of tags 
   */
  get maxTagCount(): number { return this._maxTagCount; }
  /**
   * @param {number} value The maximum number of tags
   */
  @Input() set maxTagCount(value: number)  { this._maxTagCount = value; }

  private _tags: string[] = [];
  /**
   * @returns {string[]} The list of tags 
   */
  get tags() : string[] { return this._tags; }
  /**
   * @param {string[]} value The list of tags 
   */
  @Input() set tags(value: string[]) { this._tags = value; }

  /**
   * Tags changed event
   */
  @Output() tagsChanged = new EventEmitter<string[]>();

  /**
   * Event handler: adds a new tag
   * 
   * @param {MatChipInputEvent} event Input event for the tag control
   */
  handleAddNewTag(event: MatChipInputEvent)
  {
    const input = event.input;
    const value = event.value.trim();
    if (!nullOrEmpty(value) && ! this.tags.some(tag => tag == value)) 
    {
      this.tags.push(value);
      this.tagsChanged.emit(this.tags);
    }
    if (input) 
      input.value = '';
  }

  /**
   * Event handler: removes tag
   * 
   * @param {string} tag The tag to remove
   */
  handleRemoveTag(tag: string)
  {
    const index = this.tags.indexOf(tag);
    if (index >= 0) 
    {
      this.tags.splice(index, 1);
      this.tagsChanged.emit(this.tags);
    }
  }
}
