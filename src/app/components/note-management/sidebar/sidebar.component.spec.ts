import { getNewCategoryId } from './../../../redux/state';
import { NewCategoryChangeAction } from '../../../redux/actions/category/newCategoryChangeAction';
import { CategoryActionKind } from './../../../redux/actions/category/categoryActionKind';
import { SelectedCategoryChangeAction } from './../../../redux/actions/category/selectedCategoryChangeAction';
import { MessageDialogService } from '../../../services/message-dialog.service';
import { LocalizationService } from '../../../services/localization.service';
import { getInvalidCategoryId, getInvalidNoteId, getSelectedCategory } from '../../../redux/state';
import { CategoryModel } from '../../../models/categories/categoryModel';
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
import { CategoriesService } from '../../../services/category/categories.service';
import { MessageKind } from '../../../messageKind';
import { TitleChangeAction } from '../../../redux/actions/other/titleChangeAction';
import { OtherActionKind } from '../../../redux/actions/other/otherActionKind';
import { TranslatePipeMock } from '../../../services/mocks/translatePipeMock';

describe('SidebarComponent', () => 
{
  let filterFunc;
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let storeMock: StoreMock;
  let localizationServiceMock = { execute(): any { } }
  let invalidCategoryId: Subject<string>;
  let invalidNoteId: Subject<string>;
  let selectedCategory: Subject<CategoryModel>;
  let newCategoryId: Subject<string>;
  let categories: CategoryModel[];
  let categoriesSubject: Subject<CategoryModel[]>;
  let categoriesServiceMock: any = { get() { } };
  let getSpy: jasmine.Spy<any>;
  let localizationSpy: jasmine.Spy<any>;

  beforeEach(async(() => 
  {
    localizationSpy = spyOn(localizationServiceMock, "execute").and.returnValue("test");
    invalidCategoryId = new Subject();
    invalidNoteId = new Subject();
    selectedCategory = new Subject();
    newCategoryId = new Subject<string>();
    categoriesSubject = new Subject<CategoryModel[]>();
    getSpy = spyOn(categoriesServiceMock, "get").and.callFake((func) => 
    {
      filterFunc = func;
      return categoriesSubject;
    });
    storeMock = new StoreMock();
    storeMock.resultSelector = (selector) => 
    {
      if (selector == getInvalidCategoryId)
        return invalidCategoryId;
      if (selector == getInvalidNoteId)
        return invalidNoteId;
      if (selector == getSelectedCategory)
        return selectedCategory;
      if (selector == getNewCategoryId)
        return newCategoryId;
      return null;  
    }

    TestBed.configureTestingModule(
    {
      declarations: [ SidebarComponent, FilterInputComponent, CategoryComponent, TranslatePipeMock ],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: LocalizationService, useValue: localizationServiceMock },
        { provide: MessageDialogService, useValue: { } },
        { provide: CategoriesService, useValue: categoriesServiceMock },
        TranslatePipeMock
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

  it('listens to category changes', () => 
  {
    expect(getSpy).toHaveBeenCalled();
    expect(filterFunc).toBeTruthy();
  });

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

  it("does set title on category changed", () => 
  {
    selectedCategory.next(new CategoryModel("1", "test-title"))

    expect(localizationSpy.calls.first().args[0]).toBe(MessageKind.CategoryTitle);
    expect(localizationSpy.calls.first().args[1]).toEqual({title: "test-title"});
    let action: TitleChangeAction = storeMock.dispatchedActions[0] as TitleChangeAction;
    expect(action.type).toBe(OtherActionKind.TitleChange);
    expect(action.payload).toBe("test");
  });

  it('filter categories', () => 
  {
    let func = (component as any).filterFunc;
    (component as any).selectedCategory = categories[0];
    component.handleFilterTextChanged("filterText");
    //Selected category is always shown
    let result : Boolean = func(categories[0]); 
    expect(result).toBe(true);

    //Not selected category and filter doesn't match
    result = func(categories[1]); 
    expect(result).toBe(false);

    //Not selected category and filter matches
    component.handleFilterTextChanged("itle2");
    result = func(categories[1]); 
    expect(result).toBe(true);
  });

  it('handleAddButtonClicked adds a new category', () => 
  {
    categoriesSubject.next([]);
    component.handleAddButtonClicked();

    expect((component as any).categories.length).toBe(1);
    expect((component as any).categories[0].isEditing).toBe(true);
  });

  it('does remove the new category if the new category has changed to null', () => 
  {
    categoriesSubject.next([]);
    component.handleAddButtonClicked();
    newCategoryId.next(null);

    expect((component as any).categories.length).toBe(0);
  });

  it('handleAddButtonClicked changes the new category', () => 
  {
    categoriesSubject.next(categories);
    component.handleAddButtonClicked();

    let action: NewCategoryChangeAction = storeMock.dispatchedActions[1] as NewCategoryChangeAction;
    expect(action.type).toBe(CategoryActionKind.NewCategoryChange);
    expect(action.payload != null).toBe(true);
  });

  it('handleAddButtonClicked does not add a new category if invalid note or category exists', () => 
  {
    categoriesSubject.next([]);
    invalidCategoryId.next("1");
    component.handleAddButtonClicked();
    expect((component as any).categories.length).toBe(0);

    invalidNoteId.next("1");
    component.handleAddButtonClicked();
    expect((component as any).categories.length).toBe(0);

    invalidCategoryId.next(null);
    component.handleAddButtonClicked();
    expect((component as any).categories.length).toBe(0);
  });
});