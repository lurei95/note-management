import { LocalizationService } from '../../../services/localization.service';
import { CategoriesService } from '../../../services/category/categories.service';
import { MessageDialogService } from '../../../services/message-dialog.service';
import { getInvalidCategoryId, getInvalidNoteId, getSelectedCategory } from '../../../redux/state';
import { CategoryModel } from '../../../models/categories/categoryModel';
import { StoreMock } from '../../../services/mocks/storeMock';
import { CategoryComponent } from './category.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Dictionary } from '../../../util/dictionary';
import { CategoryValidityChangeAction } from '../../../redux/actions/category/categoryValidityChangeAction';
import { CategoryActionKind } from '../../../redux/actions/category/categoryActionKind';
import { nullOrEmpty } from '../../../util/utility';
import { SelectedCategoryChangeAction } from '../../../redux/actions/category/selectedCategoryChangeAction';
import { MessageKind } from '../../../messageKind';
import { DialogResult } from '../../utiltity/dialogResult';
import { TranslatePipeMock } from '../../../services/mocks/translatePipeMock';
import { TranslatePipe } from '@ngx-translate/core';

describe('CategoryComponent', () => 
{
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  let category: CategoryModel;
  let storeMock: StoreMock;
  let invalidCategoryId: Subject<string>;
  let invalidNoteId: Subject<string>;
  let selectedCategory: Subject<CategoryModel>;
  let categoryServiceMock: any = {
    validate() {},
    save() {},
    delete() {}
  };
  let deleteSpy: jasmine.Spy<any>;
  let localizationSpy: jasmine.Spy<any>;
  let messageDialogSpy: jasmine.Spy<any>;
  let localizationServiceMock = { execute(): any { } }
  let messageDialogService = { execute(): any { } }

  beforeEach(async(() => 
  {
    deleteSpy = spyOn(categoryServiceMock, "delete");
    messageDialogSpy = spyOn(messageDialogService, "execute");
    localizationSpy = spyOn(localizationServiceMock, "execute").and.returnValue("test");
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
      if (selector == getSelectedCategory)
        return selectedCategory;
      return null;  
    }

    TestBed.configureTestingModule(
    {
      imports: [ FormsModule ],
      declarations: [ CategoryComponent, TranslatePipeMock ],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: LocalizationService, useValue: localizationServiceMock },
        { provide: MessageDialogService, useValue: messageDialogService },
        { provide: CategoriesService, useValue: categoryServiceMock },
        TranslatePipeMock
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

  it('handleDeleteButtonClicked shows the message dialog to ask the user if they really want to delete the category', () => 
  {
    component.handleDeleteButtonClicked();

    expect(localizationSpy.calls.all()[0].args[0]).toBe(MessageKind.DeleteCategoryDialogText);
    expect(localizationSpy.calls.all()[1].args[0]).toBe(MessageKind.DeleteCategoryDialogTitle);
    expect(messageDialogSpy.calls.first().args[0]).toBe("test");
    expect(messageDialogSpy.calls.first().args[1]).toBe("test");
    expect(messageDialogSpy.calls.first().args[2]).toContain(DialogResult.Delete);
    expect(messageDialogSpy.calls.first().args[2]).toContain(DialogResult.Cancel);
  });

  it('handleDeleteDialogFinished deletes the category on positive dialog result', () => 
  {
    (component as any).handleDeleteDialogFinished(DialogResult.Delete);
    expect(deleteSpy).toHaveBeenCalledWith(category);
  });

  it('handleDeleteDialogFinished does not delete the category on negative dialog result', () => 
  {
    (component as any).handleDeleteDialogFinished(DialogResult.Cancel);
    expect(deleteSpy.calls.count()).toBe(0);
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

  it("handleCategoryClicked sets the category selected if not in edit mode", () => 
  {
    component.handleCategoryClicked();

    let action: SelectedCategoryChangeAction 
      = (storeMock.dispatchedActions[0] as SelectedCategoryChangeAction);
    expect(action.type).toBe(CategoryActionKind.SelectedCategoryChange);
    expect(action.payload).toBe(category);
  });

  it("handleCategoryClicked does not set the category selected or the new title if in edit mode", () => 
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

  it("does save changes on focus leaving", () => 
  {
    component.editMode = true;
    let spy = spyOn<any>(component, "trySaveChanges");
    component.handleFocusLeaving();
    expect(spy).toHaveBeenCalled();
  });

  it("does not save changes on focus leaving when not in edit mode", () => 
  {
    component.editMode = false;
    let spy = spyOn<any>(component, "trySaveChanges");
    component.handleFocusLeaving();
    expect(spy.calls.count()).toBe(0);
  });

  it("does not save changes on focus leaving when pointer still over component", () => 
  {
    component.editMode = true;
    component.handlePointerEnter();
    let spy = spyOn<any>(component, "trySaveChanges");
    component.handleFocusLeaving();
    expect(spy.calls.count()).toBe(0);
  });
});