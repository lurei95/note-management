import { CategoryAction } from './../../redux/actions/category/categoryAction';
import { DeleteServiceMock } from './../../services/mocks/deleteServiceMock';
import { ValidateNoteService } from './../../services/note/validate-note.service';
import { MessageDialogService } from './../../services/message-dialog.service';
import { LocalizationService } from './../../services/localization.service';
import { getInvalidCategoryId, getInvalidNoteId, getSelectedCatgeory } from 'src/app/redux/state';
import { CategoryModel } from './../../models/categoryModel';
import { StoreMock } from './../../services/mocks/storeMock';
import { CategoryComponent } from './../category/category.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { SaveCategoryService } from 'src/app/services/category/save-category.service';
import { DeleteCategoryService } from 'src/app/services/category/delete-category.service';
import { FormsModule } from '@angular/forms';
import { ValidationServiceMock } from 'src/app/services/mocks/validationServiceMock';
import { NoteModel } from 'src/app/models/noteModel';
import { Dictionary } from 'src/app/util/dictionary';
import { CategoryValidityChangeAction } from 'src/app/redux/actions/category/categoryValidityChangeAction';
import { CategoryActionKind } from 'src/app/redux/actions/category/categoryActionKind';
import { nullOrEmpty } from 'src/app/util/utility';
import { DialogResult } from '../dialogs/dialogResult';
import { By } from '@angular/platform-browser';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  let validationService: ValidationServiceMock<NoteModel>
  let deleteService: DeleteServiceMock<CategoryModel>;
  let category: CategoryModel;
  let storeMock: StoreMock;
  let invalidCategoryId: Subject<string>;
  let invalidNoteId: Subject<string>;
  let selectedCategory: Subject<CategoryModel>;

  beforeEach(async(() => 
  {
    validationService = new ValidationServiceMock<NoteModel>();
    deleteService = new DeleteServiceMock<CategoryModel>();
    invalidCategoryId = new Subject();
    invalidNoteId = new Subject();
    selectedCategory = new Subject();
    storeMock = new StoreMock();
    storeMock.resultSelector = (selector) => 
    {
      if (selector == getInvalidCategoryId)
        return invalidCategoryId;
      if (selector == getInvalidNoteId)
        return invalidNoteId;
      if (selector == getSelectedCatgeory)
        return selectedCategory;
      return null;  
    }

    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ CategoryComponent ],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: ValidateNoteService, useValue: validationService },
        { provide: LocalizationService, useValue: { } },
        { provide: SaveCategoryService, useValue: { } },
        { provide: MessageDialogService, useValue: { } },
        { provide: DeleteCategoryService, useValue: deleteService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => 
  {
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    category = new CategoryModel("1", "title1");
    component.model = category;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('handleEditButtonClicked does not set edit mode if invalid note or category exists', () => 
  {
    invalidCategoryId.next("test");
    component.handleEditButtonClicked();
    expect(component.editMode).toBe(false);

    invalidNoteId.next("test");
    component.handleEditButtonClicked();
    expect(component.editMode).toBe(false);

    invalidCategoryId.next(null);
    component.handleEditButtonClicked();
    expect(component.editMode).toBe(false);
  });

  it('handleEditButtonClicked sets edit mode if no invalid note or category exists', () => 
  {
    component.handleEditButtonClicked();
    expect(component.editMode).toBe(true);
  });

  it("does validate the model on title changed", () => 
  {
    let spy = spyOn<any>(component, "validateModel");

    component.handleTitleChanged("test");

    expect(component.title).toBe("test")
    expect(spy).toHaveBeenCalled();
  });

  it("does set title error on handleValidationResult if title is empty", () => 
  {
    let error = new Dictionary<string>([{ key: "title", value: "testError" }]);

    let result = (component as any).handleValidationResult(error);

    expect(result).toBe(false);
    expect(component.titleError).toBe("testError");
  });

  it("does update invalidCategoryId on handleValidationResult if title is empty", () => 
  {
    let error = new Dictionary<string>([{ key: "title", value: "testError" }]);

    (component as any).handleValidationResult(error);

    let action: CategoryValidityChangeAction 
      = (storeMock.dispatchedActions[0] as CategoryValidityChangeAction);
    expect(action.type).toBe(CategoryActionKind.CategoryValidityChange);
    expect(action.payload).toBe("1");
  });

  it("does unset title error on handleValidationResult if title is not empty", () => 
  {
    let error = new Dictionary<string>([{ key: "title", value: "testError" }]);
    (component as any).handleValidationResult(error);
    let result = (component as any).handleValidationResult(new Dictionary<string>());

    expect(result).toBe(true);
    expect(nullOrEmpty(component.titleError)).toBe(true);
  });

  it("handleValidationResult does unset invalidCategoryId if previous invalidCategoryId was id of edited category and title is not empty", () => 
  {
    invalidCategoryId .next("1");

    (component as any).handleValidationResult(new Dictionary<string>());

    let action: CategoryValidityChangeAction 
      = (storeMock.dispatchedActions[0] as CategoryValidityChangeAction);
    expect(action.type).toBe(CategoryActionKind.CategoryValidityChange);
    expect(action.payload).toBeNull();
  });

  it("handleDeleteDialogFinished does execute the delete service when then result was to delete", () => 
  {
    (component as any).handleDeleteDialogFinished(DialogResult.Delete);

    expect(deleteService.parameter).toBe(category);
  });

  it("handleDeleteDialogFinished does not execute the delete service when then result was not to delete", () => 
  {
    component.editMode = true;

    (component as any).handleDeleteDialogFinished(DialogResult.Cancel);

    expect(deleteService.parameter).toBeUndefined();
    expect(component.editMode).toBe(false);
  });

  it("handleCategoryClicked sets the category selected if not in edit mode", () => 
  {
    component.handleCategoryClicked();

    let action: CategoryAction = (storeMock.dispatchedActions[0] as CategoryAction);
    expect(action.type).toBe(CategoryActionKind.SelectedCategoryChange);
    expect(action.payload).toBe(category);
  });

  it("handleCategoryClicked does not set the category selected if in edit mode", () => 
  {
    component.editMode = true;

    component.handleCategoryClicked();

    expect(storeMock.dispatchedActions.length).toBe(0);
  });

  it("does set isSelected on selectedCategory change", () => 
  {
    selectedCategory.next(category);

    expect(component.isSelected).toBe(true);
  });

  it("does unset isSelected on selectedCategory change to other category", () => 
  {
    selectedCategory.next(category);
    selectedCategory.next(new CategoryModel("2"));


    expect(component.isSelected).toBe(false);
  });
});