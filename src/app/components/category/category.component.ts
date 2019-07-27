import { CategoryValidityChangeAction } from './../../redux/actions/category/categoryValidityChangeAction';
import { ValidateCategoryService } from './../../services/category/validate-category.service';
import { SaveCategoryService } from '../../services/category/save-category.service';
import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { DeleteCategoryService } from 'src/app/services/category/delete-category.service';
import { EditableComponent } from '../editableComponent';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { DialogResult } from '../dialogs/dialogResult';
import { clone, coalesce } from 'src/app/util/utility';
import { Dictionary } from 'src/app/util/dictionary';
import { MessageKind } from 'src/app/messageKind';
import { MessageDialogComponent } from '../dialogs/message-dialog/message-dialog.component';
import { LocalizationService } from 'src/app/services/localization.service';
import { getInvalidNoteId, getInvalidCategoryId, IApplicationState, getSelectedCatgeory } from 'src/app/redux/state';
import { CategoryAction } from 'src/app/redux/actions/category/categoryAction';
import { CategoryActionKind } from 'src/app/redux/actions/category/categoryActionKind';
import { CategoryModel } from 'src/app/models/categoryModel';
import { DialogInformation } from '../dialogs/dialogInformation';
import { MessageDialogService } from 'src/app/services/message-dialog.service';

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

  private isButtonPointingOver: boolean;
  private selectedCategory: CategoryModel;
  private invalidCategoryId: string;
  private invalidNoteId: string;

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

  /**
   * @param {CategoryModel} value The category which is edited in the component
   */
  @Input()
  set category(value: CategoryModel) 
  { 
    this.model = value;
    this.unmodified = clone<CategoryModel>(this.model, CategoryModel);
  }
  /**
   * @returns {CategoryModel} The category which is edited in the component
   */
  get category(): CategoryModel { return this.model; }

  private _editMode: boolean;
  /**
   * @param {boolean} value Whether the component is in edit mode
   */
  set editMode (value: boolean)
  {
    this._editMode = value;
    if(this.editMode)
      this.titleInput.nativeElement.focus();
  }
  /**
   * @returns {boolean} Whether the component is in edit mode
   */
  get editMode(): boolean { return this._editMode; }

  /**
   * Constructor
   * 
   * @param {DeleteCategoryService} deleteService Injected: service for deleting the category
   * @param {SaveCategoryService} saveService Injected: service for savin the changes of the category
   * @param {Store<IApplicationState>} store Injected: redux store
   * @param {LocalizationService} localizationService Injected: service for getting localized strings
   * @param {LocalizationService} localizationService Injected: service for getting localized strings
   * @param {MessageDialogService} dialogService Injected: Service for displaying a message dialog
   */
  constructor(validationService: ValidateCategoryService, saveService: SaveCategoryService,
    private deleteService: DeleteCategoryService, private store: Store<IApplicationState>, 
    private localizationService: LocalizationService, private dialogService: MessageDialogService) 
  { 
    super(validationService, saveService); 

    this.store.select(getInvalidCategoryId).subscribe((x: string) => this.invalidCategoryId = x);
    this.store.select(getInvalidNoteId).subscribe((x: string) => this.invalidNoteId = x);
    this.store.select(getSelectedCatgeory).subscribe(
      (x: CategoryModel) => this.handleSelectedCategoryChanged(x));
  }

  /**
   * Event handler: sets the component to edit mode
   */
  onEditButtonClicked() 
  { 
    if(this.invalidCategoryId == null && this.invalidNoteId == null)
      this.editMode = true; 
  }

  /**
   * Event handler: validates the category to reset the error when the title is changed
   */
  onTitleChanged() 
  { 
    if (this.validateModel() && this.invalidCategoryId == this.category.id)
      this.store.dispatch(new CategoryValidityChangeAction(null));
    else
      this.store.dispatch(new CategoryValidityChangeAction(this.category.id));
  }

  /**
   * Event handler: selected the category
   */
  onCategoryClicked()
  {
    if(!this.editMode && !this._isSelected && !this.isButtonPointingOver)
      this.store.dispatch(new CategoryAction(CategoryActionKind.SelectedCategoryChange, this.category));
  }

  /**
   * Event handler: tries to save the changes to the note on leaving focus
   */
  onFocusLeaving() 
  {
    if (this.editMode && !this.isButtonPointingOver)
      this.trySaveChanges();
  }

  /**
   * Event handler: sets edit mode and selected on initialized
   */
  ngAfterViewInit() 
  {
    setTimeout(() => {
      if (this.category.isEditing && this.titleInput != null)
        this.editMode = true;
      this.trySetSelected();
    })
  }

  /**
   * Event handler: deletes the category
   */
  onDeleteButtonClicked()
  { 
    let text = this.localizationService.execute(MessageKind.DeleteCategoryDialogText, 
      {title: coalesce(this.category.title)});
    let title = this.localizationService.execute(MessageKind.DeleteCategoryDialogTitle);
    this.dialogService.execute(title, text, [DialogResult.Delete, DialogResult.Cancel], 
      result => this.onDeleteDialogFinished(result));
  }

  /**
   * Event handler: pointer is over the component
   */
  onPointerEnter() { this.isButtonPointingOver = true; }

  /**
   * Event handler: pointer is not over the component
   */
  onPointerLeave() { this.isButtonPointingOver = false; }

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

      if (this.invalidCategoryId != this.category.id)
        this.store.dispatch(new CategoryValidityChangeAction(this.category.id));
      
      return false;
    }
    else
    {
      this.model.isEditing = false;
      if (this.invalidCategoryId == this.category.id)
        this.store.dispatch(new CategoryValidityChangeAction(null));
      return true;
    }
  }

  private onDeleteDialogFinished(result: string)
  {
    if(result == DialogResult.Delete)
      this.deleteService.execute(this.category); 
    else
      this.editMode = false;
  }

  private trySetSelected()
  {
    if (this.category != null && this.selectedCategory != null)
      this._isSelected = this.selectedCategory.id == this.category.id;
  }

  private handleSelectedCategoryChanged(selectedCategory: CategoryModel)
  {  
    this.selectedCategory = selectedCategory;
    this.trySetSelected();
  }
}