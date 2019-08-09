import { CategoryActionKind } from './../../../redux/actions/category/categoryActionKind';
import { SelectedCategoryChangeAction } from './../../../redux/actions/category/selectedCategoryChangeAction';
import { MessageDialogService } from '../../../services/message-dialog.service';
import { LocalizationService } from '../../../services/localization.service';
import { getInvalidCategoryId, getInvalidNoteId, getSelectedCategory } from 'src/app/redux/state';
import { CategoryModel } from '../../../models/categories/categoryModel';
import { FilterCategoriesService } from '../../../services/category/filter-categories.service';
import { FilterCategoriesServiceMock } from '../../../services/mocks/filterCategoriesServiceMock';
import { StoreMock } from '../../../services/mocks/storeMock';
import { CategoryComponent } from './../category/category.component';
import { FilterInputComponent } from '../../utiltity/filter-input/filter-input.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CategoriesService } from 'src/app/services/category/categories.service';
import { NotesService } from 'src/app/services/note/notes.service';

describe('SidebarComponent', () => 
{
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let storeMock: StoreMock;
  let filterService: FilterCategoriesServiceMock;
  let invalidCategoryId: Subject<string>;
  let invalidNoteId: Subject<string>;
  let selectedCategory: Subject<CategoryModel>;
  let categoriesServiceMock: any = { get() {} };
  let getSpy: jasmine.Spy<any>;
  let categories: CategoryModel[];

  beforeEach(async(() => 
  {
    getSpy = spyOn(categoriesServiceMock, "get");
    invalidCategoryId = new Subject();
    invalidNoteId = new Subject();
    selectedCategory = new Subject();
    filterService = new FilterCategoriesServiceMock();
    storeMock = new StoreMock();
    storeMock.resultSelector = (selector) => 
    {
      if (selector == getInvalidCategoryId)
        return invalidCategoryId;
      if (selector == getInvalidNoteId)
        return invalidNoteId;
      if (selector == getSelectedCategory)
        return selectedCategory;
      return null;  
    }

    TestBed.configureTestingModule(
    {
      declarations: [ SidebarComponent, FilterInputComponent, CategoryComponent ],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: FilterCategoriesService, useValue: filterService },
        { provide: LocalizationService, useValue: { } },
        { provide: MessageDialogService, useValue: { } },
        { provide: CategoriesService, useValue: categoriesServiceMock }
      ],
      imports: [ FormsModule ]
    }).compileComponents();
  }));

  beforeEach(() => 
  {
    let category1 = new CategoryModel("1", "title1");
    category1.timestamp = 1;
    let category2 = new CategoryModel("2", "title2");
    category2.timestamp = 2;
    categories = [category1, category2];
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('listens to category changes', () => expect(getSpy).toHaveBeenCalled());

  it('displays categories on categories changed', () => 
  {
    (component as any).handleCategoriesChanged(categories); 
    fixture.detectChanges();
    let categoryElements: DebugElement[] = fixture.debugElement.queryAll(By.css("app-category"));
    expect(categoryElements.length).toBe(2);
  });

  it('selects first category on categories changed if no category previously selected', () => 
  {
    (component as any).handleCategoriesChanged(categories); 
    let action = storeMock.dispatchedActions[0] as SelectedCategoryChangeAction;
    expect(action.type).toBe(CategoryActionKind.SelectedCategoryChange);
    expect(action.payload).toBe(categories[0])
  });

  it('handleFilterTextChanged does call the filter service', () => 
  {
    (component as any).categories = categories;
    component.handleFilterTextChanged("filterText");

    expect(filterService.filterText).toBe("filterText");
    expect(filterService.categories).toBe(categories);
  });

  it('handleAddButtonClicked adds a new category', () => 
  {
    component.handleAddButtonClicked();

    expect(component.filteredCategories.length).toBe(1);
    expect(component.filteredCategories[0].isEditing).toBe(true);
  });

  it('handleAddButtonClicked does not add a new category if invalid note or category exsits', () => 
  {
    invalidCategoryId.next("1");
    component.handleAddButtonClicked();
    expect(component.filteredCategories.length).toBe(0);

    invalidNoteId.next("1");
    component.handleAddButtonClicked();
    expect(component.filteredCategories.length).toBe(0);

    invalidCategoryId.next(null);
    component.handleAddButtonClicked();
    expect(component.filteredCategories.length).toBe(0);
  });
});