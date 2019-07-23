import { ValidateCategoryService } from './../../services/category/validate-category.service';
import { CategoryActionKind } from './../../redux/actions/category';
import { CategoryAction } from 'src/app/redux/actions/category';
import { SaveCategoryService } from '../../services/category/save-category.service';
import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { CategoryDisplayModel } from 'src/app/models/categoryModel';
import { DeleteCategoryService } from 'src/app/services/category/delete-category.service';
import { EditableComponent } from '../editableComponent';
import { Store } from '@ngrx/store';
import { IApplicationState, getSelectedCatgeory, getCategories } from 'src/app/redux/reducers';
import { CategoryDeleteDialogComponent } from '../dialogs/category-delete-dialog/category-delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogResult } from '../dialogs/dialogResult';
import { clone, nullOrEmpty } from 'src/app/util/utility';
import { Dictionary } from 'src/app/util/dictionary';

/**
 * Component for displaying and editing a category
 */
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent extends EditableComponent<CategoryDisplayModel>
{
  @ViewChild("titleInput", {static: false}) private titleInput: ElementRef;

  private isPointingOver: boolean;
  private selectedCategory: CategoryDisplayModel;
  private categories: CategoryDisplayModel[];

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
   * The model which is edited in the component
   */
  protected model: CategoryDisplayModel;
  /**
   * @param {CategoryDisplayModel} value The category which is edited in the component
   */
  @Input()
  set category(value: CategoryDisplayModel) 
  { 
    this.model = value;
    this.unmodified = clone<CategoryDisplayModel>(this.model, CategoryDisplayModel);
  }
  /**
   * @returns {CategoryDisplayModel} The category which is edited in the component
   */
  get category(): CategoryDisplayModel { return this.model; }

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
   * @param {MatDialog} dialog Injected: service for showing a dialog
   */
  constructor(validationService: ValidateCategoryService, saveService: SaveCategoryService,
    private deleteService: DeleteCategoryService, private store: Store<IApplicationState>, 
    private dialog: MatDialog) 
  { 
    super(validationService, saveService); 
    this.store.select(getSelectedCatgeory).subscribe(
      (x: CategoryDisplayModel) => this.handleSelectedCategoryChanged(x));
    this.store.select(getCategories).subscribe(
      (x: CategoryDisplayModel[]) => this.handleCategoriesChanged(x));
  }

  /**
   * Event handler: sets the component to edit mode
   */
  onEditButtonClicked() 
  { 
    if(!this.categories.some(category => !nullOrEmpty(category.title)))
      this.editMode = true; 
  }

  /**
   * Event handler: validates the category to reset the error when the title is changed
   */
  onTitleChanged() { this.validateModel(); }

  /**
   * Event handler: selected the category
   */
  onCategoryClicked()
  {
    if(!this.editMode && !this._isSelected && !this.isPointingOver)
      this.store.dispatch(new CategoryAction(CategoryActionKind.SelectedCategoryChange, this.category));
  }

  /**
   * Event handler: tries to save the changes to the note on leaving focus
   */
  onFocusLeaving() 
  {
    if (this.editMode && !this.isPointingOver)
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
    const dialogRef = this.dialog.open(CategoryDeleteDialogComponent, {
      data: this.category.title
    });
    dialogRef.afterClosed().subscribe(result => this.onDeleteDialogFinished(result));
  }

  /**
   * Event handler: pointer is over the component
   */
  onPointerEnter() { this.isPointingOver = true; }

  /**
   * Event handler: pointer is not over the component
   */
  onPointerLeave() { this.isPointingOver = false; }

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
      return false;
    }
    else
    {
      this.model.isEditing = false;
      return true;
    }
  }

  private onDeleteDialogFinished(result: string)
  {
    if(result == DialogResult.Confirm)
      this.deleteService.execute(this.category); 
  }

  private trySetSelected()
  {
    if (this.category != null && this.selectedCategory != null)
        this._isSelected = this.selectedCategory.id == this.category.id;
  }

  private handleCategoriesChanged(categories: CategoryDisplayModel[])
  { this.categories = categories; }

  private handleSelectedCategoryChanged(selectedCategory: CategoryDisplayModel)
  {  
    this.selectedCategory = selectedCategory;
    this.trySetSelected();
  }
}