import { CategoryActionKind } from './../../redux/actions/category';
import { CategoryAction } from 'src/app/redux/actions/category';
import { UpdateCategoryService } from './../../services/category/update-category.service';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { CategoryDisplayModel } from 'src/app/models/categoryModel';
import { DeleteCategoryService } from 'src/app/services/category/delete-category.service';
import { nullOrEmpty } from 'src/app/util/utility';
import { EditableComponent } from '../editableComponent';
import { Store } from '@ngrx/store';
import { IApplicationState, getSelectedCatgeory, getCategories } from 'src/app/redux/reducers';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent extends EditableComponent<CategoryDisplayModel> implements OnInit 
{
  @ViewChild("titleInput", {static: false}) titleInput: ElementRef;
  @ViewChild("editButton", {static: false}) editButton: ElementRef;

  private isPointOver: boolean;
  private selectedCategory: CategoryDisplayModel;
  private categories: CategoryDisplayModel[];

  private _hasError: boolean;
  get hasError() { return this._hasError; }

  private _isSelected: boolean;
  get isSelected() { return this._isSelected; }

  protected model: CategoryDisplayModel;
  @Input()
  set category(value: CategoryDisplayModel) { this.model = value; }
  get category() { return this.model; }

  private _editMode: boolean;
  set editMode (value: boolean)
  {
    this._editMode = value;
    if(this.editMode)
      this.titleInput.nativeElement.focus();
  }
  get editMode() { return this._editMode; }

  constructor(private deleteService: DeleteCategoryService, private updateService: UpdateCategoryService, 
    private store: Store<IApplicationState>) 
  { 
    super(); 
    this.store.select(getSelectedCatgeory).subscribe(
      (x: CategoryDisplayModel) => this.handleSelectedCategoryChanged(x));
    this.store.select(getCategories).subscribe(
      (x: CategoryDisplayModel[]) => this.handleCategoriesChanged(x));
  }

  ngOnInit() { }

  handleCategoriesChanged(categories: CategoryDisplayModel[])
  { this.categories = categories; }

  handleSelectedCategoryChanged(selectedCategory: CategoryDisplayModel)
  {  
    this.selectedCategory = selectedCategory;
    if (this.category != null)
      this._isSelected = selectedCategory.id == this.category.id;
  }

  onEditButtonClicked() 
  { 
    if(!this.categories.some(category => !category.isValid()))
      this.editMode = true; 
  }

  onTitleChanged() { this._hasError = !this.category.isValid(); }

  onCategoryClicked()
  {
    if(!this.editMode && !this._isSelected && !this.isPointOver)
      this.store.dispatch(new CategoryAction(CategoryActionKind.SelectedCategoryChange, this.category));
  }

  onFocusLeaving() 
  {
    if (this.editMode && !this.isPointOver)
      this.trySaveChanges();
  }

  ngAfterViewInit() 
  {
    setTimeout(() => {
      if (this.category.isEditing && this.titleInput != null)
        this.editMode = true;
      if (this.category != null)
        this._isSelected = this.selectedCategory.id == this.category.id;
    })
  }

  onDeleteButtonClicked()
  { this.deleteService.execute(this.category);  }

  onPointerEnter() { this.isPointOver = true; }

  onPointerLeave() { this.isPointOver = false;}

  handleSaveShortcut(e)
  {
    e.preventDefault();
    e.stopPropagation();
    this.trySaveChanges();
  }

  trySaveChanges()
  {
    if (!this.category.isValid())
    {
      this._hasError = true;
      this.titleInput.nativeElement.focus();
      return;
    }
    this.updateService.execute(this.category);
    this.editMode = false;
  }
}