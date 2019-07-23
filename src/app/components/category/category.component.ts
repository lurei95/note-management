import { CategoryActionKind } from './../../redux/actions/category';
import { CategoryAction } from 'src/app/redux/actions/category';
import { SaveCategoryService } from '../../services/category/save-category.service';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { CategoryDisplayModel } from 'src/app/models/categoryModel';
import { DeleteCategoryService } from 'src/app/services/category/delete-category.service';
import { EditableComponent } from '../editableComponent';
import { Store } from '@ngrx/store';
import { IApplicationState, getSelectedCatgeory, getCategories } from 'src/app/redux/reducers';
import { CategoryDeleteDialogComponent } from '../dialogs/category-delete-dialog/category-delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogResult } from '../dialogs/dialogResult';
import { clone } from 'src/app/util/utility';

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
  private unmodified: CategoryDisplayModel;

  private _hasError: boolean;
  /**
   * @returns {boolean} If the category note is not valid 
   */
  get hasError(): boolean { return this._hasError; }

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
  constructor(private deleteService: DeleteCategoryService, private saveService: SaveCategoryService,   
    private store: Store<IApplicationState>, private dialog: MatDialog) 
  { 
    super(); 
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
    if(!this.categories.some(category => !category.isValid()))
      this.editMode = true; 
  }

  /**
   * Event handler: validates the category to reset the error when the title is changed
   */
  onTitleChanged() { this._hasError = !this.category.isValid(); }

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
   * Event handler: tries to save the changes on pressing the save shortcut (ctrl + s)
   * 
   * @param {Event} e The event
   */
  handleSaveShortcut(e: Event)
  {
    e.preventDefault();
    e.stopPropagation();
    this.trySaveChanges();
  }

  private onDeleteDialogFinished(result: string)
  {
    if(result == DialogResult.Confirm)
      this.deleteService.execute(this.category); 
  }

  private trySaveChanges()
  {
    if (this.model.equals(this.unmodified))
      return;

    if (!this.category.isValid())
    {
      this._hasError = true;
      this.titleInput.nativeElement.focus();
      return;
    }
    this.saveService.execute(this.category);
    this.unmodified = clone<CategoryDisplayModel>(this.model, CategoryDisplayModel);
    this.editMode = false;
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