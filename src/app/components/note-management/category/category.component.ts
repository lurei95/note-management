import { TitleChangeAction } from './../../../redux/actions/other/titleChangeAction';
import { CategoriesService } from './../../../services/category/categories.service';
import { CategoryValidityChangeAction } from '../../../redux/actions/category/categoryValidityChangeAction';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { EditableComponent } from '../../editableComponent';
import { Store } from '@ngrx/store';
import { DialogResult } from '../../utiltity/dialogResult';
import { coalesce } from 'src/app/util/utility';
import { Dictionary } from 'src/app/util/dictionary';
import { MessageKind } from 'src/app/messageKind';
import { LocalizationService } from 'src/app/services/localization.service';
import { getInvalidNoteId, getInvalidCategoryId, IApplicationState, getSelectedCategory } from 'src/app/redux/state';
import { CategoryModel } from 'src/app/models/categories/categoryModel';
import { MessageDialogService } from 'src/app/services/message-dialog.service';
import { SelectedCategoryChangeAction } from 'src/app/redux/actions/category/selectedCategoryChangeAction';
import { NotesService } from 'src/app/services/note/notes.service';

/**
 * Component for displaying and editing a category
 */
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent extends EditableComponent<CategoryModel>
{
  @ViewChild("titleInput", {static: false}) private titleInput: ElementRef;

  private isButtonPointingOver: boolean = false;
  private selectedCategory: CategoryModel = null;
  private invalidCategoryId: string = null;
  private invalidNoteId: string = null;

  /**
   * @returns {string} The title of the model
   */
  get title(): string { return coalesce(this.model.title); }

  private _titleError: string;
  /**
   * @returns {string} The error message for the title of the note
   */
  get titleError(): string { return this._titleError; }

  private _isSelected: boolean;
  /**
   * @returns {boolean} If the category is selected
   */
  get isSelected(): boolean { return this._isSelected; }

  private _editMode: boolean = false;
  /**
   * @param {boolean} value Whether the component is in edit mode
   */
  set editMode (value: boolean)
  {
    this._editMode = value;
    if (this.editMode)
      this.titleInput.nativeElement.focus();
  }
  /**
   * @returns {boolean} Whether the component is in edit mode
   */
  get editMode(): boolean { return this._editMode; }

  /**
   * Constructor
   * 
   * @param {CategoriesService} service Injected: service for the model
   * @param {Store<IApplicationState>} store Injected: redux store
   * @param {LocalizationService} localizationService Injected: service for getting localized strings
   * @param {MessageDialogService} dialogService Injected: Service for displaying a message dialog
   */
  constructor(service: CategoriesService, private store: Store<IApplicationState>, 
    private localizationService: LocalizationService, private dialogService: MessageDialogService) 
  { 
    super(service); 

    this.store.select(getInvalidCategoryId).subscribe((x: string) => this.invalidCategoryId = x);
    this.store.select(getInvalidNoteId).subscribe((x: string) => this.invalidNoteId = x);
    this.store.select(getSelectedCategory).subscribe(
      (x: CategoryModel) => this.handleSelectedCategoryChanged(x));
  }

  /**
   * Event handler: sets edit mode and selected on initialized
   */
  ngAfterViewInit() 
  {
    setTimeout(() => {
      if (this.model.isEditing && this.titleInput != null)
        this.editMode = true;
      this.trySetSelected();
    })
  }

  /**
   * Event handler: sets the component to edit mode
   */
  handleEditButtonClicked() 
  { 
    if(this.invalidCategoryId == null && this.invalidNoteId == null)
      this.editMode = true; 
  }

  /**
   * Event handler: validates the category to reset the error when the title is changed
   */
  handleTitleChanged(value: string) 
  { 
    this.model.title = value;
    this.validateModel();
  }

  /**
   * Event handler: selected the category
   */
  handleCategoryClicked()
  {
    if(!this.editMode && !this._isSelected && !this.isButtonPointingOver)
      this.store.dispatch(new SelectedCategoryChangeAction(this.model));
  }

  /**
   * Event handler: tries to save the changes to the note on leaving focus
   */
  handleFocusLeaving() 
  {
    if (this.editMode && !this.isButtonPointingOver)
      this.trySaveChanges();
  }

  /**
   * Event handler: deletes the category
   */
  handleDeleteButtonClicked()
  { 
    let text = this.localizationService.execute(MessageKind.DeleteCategoryDialogText, 
      {title: coalesce(this.model.title)});
    let title = this.localizationService.execute(MessageKind.DeleteCategoryDialogTitle);
    this.dialogService.execute(title, text, [DialogResult.Delete, DialogResult.Cancel], 
      result => this.handleDeleteDialogFinished(result));
  }

  /**
   * Event handler: pointer is over the component
   */
  handlePointerEnter() { this.isButtonPointingOver = true; }

  /**
   * Event handler: pointer is not over the component
   */
  handlePointerLeave() { this.isButtonPointingOver = false; }

  /**
   * Tries to save the changes of the model
   * 
   * @returns {boolean} If changes have been saved
   */
  protected trySaveChanges() : boolean
  {
    if (this.validateModel())
    {
      this.editMode = false;
      if (this.model.equals(this.unmodified))
        return true;
      this.saveChanges();
      return true;
    }
    return false;
  }

  /**
   * Method for handling the validation result of the model
   * 
   * @param {Dictionary<string>} result The validation result
   * @returns {boolean} Whether the model should be saved
   */
  protected handleValidationResult(result: Dictionary<string>): boolean
  {
    if (result.containsKey("title"))
    {
      this._titleError = result["title"];
      this.titleInput.nativeElement.focus();

      if (this.invalidCategoryId != this.model.id)
        this.store.dispatch(new CategoryValidityChangeAction(this.model.id));
      
      return false;
    }
    else
    {
      this.model.isEditing = false;
      if (this.invalidCategoryId == this.model.id)
        this.store.dispatch(new CategoryValidityChangeAction(null));
      this._titleError = null;
      return true;
    }
  }

  private handleDeleteDialogFinished(result: string)
  {
    if(result == DialogResult.Delete)
      this.service.delete(this.model); 
    else
      this.editMode = false;
  }

  private handleSelectedCategoryChanged(selectedCategory: CategoryModel)
  {  
    this.selectedCategory = selectedCategory;
    this.trySetSelected();
  }

  private trySetSelected()
  {
    if (this.model != null && this.selectedCategory != null)
      this._isSelected = this.selectedCategory.id == this.model.id;
  }
}