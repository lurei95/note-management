import { MessageDialogService } from './../../services/message-dialog.service';
import { SaveServiceMock } from './../../services/mocks/saveServiceMock';
import { LocalizationServiceMock } from './../../services/mocks/localizationServiecMock';
import { LocalizationService } from './../../services/localization.service';
import { getInvalidCategoryId, getInvalidNoteId, getCategories, getSelectedCatgeory } from 'src/app/redux/state';
import { CategoryModel } from './../../models/categoryModel';
import { FilterCategoriesService } from './../../services/category/filter-categories.service';
import { FilterCategoriesServiceMock } from './../../services/mocks/filterCategoriesServiceMock';
import { AddCategoryService } from './../../services/category/add-category.service';
import { StoreMock } from './../../services/mocks/storeMock';
import { CategoryComponent } from './../category/category.component';
import { FilterInputComponent } from './../filter-input/filter-input.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AddCategoryServiceMock } from 'src/app/services/mocks/addCategoryServiceMock';
import { Subject } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SaveCategoryService } from 'src/app/services/category/save-category.service';
import { DeleteCategoryService } from 'src/app/services/category/delete-category.service';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let storeMock: StoreMock;
  let addService: AddCategoryServiceMock;
  let filterService: FilterCategoriesServiceMock;
  let invalidCategoryId: Subject<string>;
  let invalidNoteId: Subject<string>;
  let categories: Subject<CategoryModel[]>;
  let selectedCategory: Subject<CategoryModel>;

  beforeEach(async(() => 
  {
    invalidCategoryId = new Subject();
    invalidNoteId = new Subject();
    categories = new Subject();
    selectedCategory = new Subject();
    addService = new AddCategoryServiceMock();
    filterService = new FilterCategoriesServiceMock();
    storeMock = new StoreMock();
    storeMock.resultSelector = (selector) => 
    {
      if (selector == getInvalidCategoryId)
        return invalidCategoryId;
      if (selector == getInvalidNoteId)
        return invalidNoteId;
      if (selector == getCategories)
        return categories;
      if (selector == getSelectedCatgeory)
        return selectedCategory;
      return null;  
    }

    TestBed.configureTestingModule({
      declarations: [ SidebarComponent, FilterInputComponent, CategoryComponent ],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: AddCategoryService, useValue: addService },
        { provide: FilterCategoriesService, useValue: filterService },
        { provide: LocalizationService, useValue: { } },
        { provide: SaveCategoryService, useValue: { } },
        { provide: MessageDialogService, useValue: { } },
        { provide: DeleteCategoryService, useValue: { } },
      ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => 
  {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    categories.next([new CategoryModel("1", "title1"), new CategoryModel("2", "title2")]);
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('displays categories on categories changed', () => 
  {
    let categoryElements: DebugElement[] = fixture.debugElement.queryAll(By.css("app-category"));
    expect(categoryElements.length).toBe(2);
  });

  it('handleAddButtonClicked calls the add service if no invalid category or note exist', () => 
  {
    component.handleAddButtonClicked();

    expect(addService.wasCalled).toBe(true);
  });

  it('handleAddButtonClicked does not call the add service if invalid category or note exist', () => 
  {
    invalidCategoryId.next("1");
    component.handleAddButtonClicked();
    expect(addService.wasCalled).toBe(false);

    invalidNoteId.next("1");
    component.handleAddButtonClicked();
    expect(addService.wasCalled).toBe(false);

    invalidCategoryId.next(null);
    component.handleAddButtonClicked();
    expect(addService.wasCalled).toBe(false);
  });

  it('handleFilterTextChanged does call the filter service', () => 
  {
    component.handleFilterTextChanged("filterText");

    expect(filterService.filterText).toBe("filterText");
    expect(filterService.categories.length).toBe(2);
  });
});
