import { getInvalidCategoryId, getInvalidNoteId } from 'src/app/redux/state';
import { StoreMock } from 'src/app/services/mocks/storeMock';
import { ValidationServiceMock } from './../services/mocks/validationServiceMock';
import { NoteModel } from '../models/noteModel';
import { SaveServiceMock } from '../services/mocks/saveServiceMock';
import { Dictionary } from '../util/dictionary';
import { NoteComponentBase } from './noteComponentBase';
import { of, Subject } from 'rxjs';
import { NoteValidityChangeAction } from '../redux/actions/note/noteValidityChangeAction';
import { NoteActionKind } from '../redux/actions/note/noteActionKind';
import { nullOrEmpty } from '../util/utility';

describe('NoteComponentBase', () =>
{
  class TestNoteComponent extends NoteComponentBase
  {
    getInvalidNoteId() { return this.invalidNoteId; }
    getInvalidCategoryId() { return this.invalidCategoryId; }

    executehandleValidationResult(value: Dictionary<string>) 
    { return this.handleValidationResult(value); }
  }

  let component: TestNoteComponent;
  let saveService: SaveServiceMock<NoteModel>
  let validationService: ValidationServiceMock<NoteModel>
  let store: StoreMock;
  let model: NoteModel;
  let invalidCategoryId: Subject<string>;
  let invalidNoteId: Subject<string>;

  beforeEach(() =>
  {
    invalidCategoryId = new Subject();
    invalidNoteId = new Subject();
    saveService = new SaveServiceMock();
    validationService = new ValidationServiceMock();
    store = new StoreMock();
    store.resultSelector = (selector) => 
    {
      if (selector == getInvalidCategoryId)
        return invalidCategoryId;
      else if (selector == getInvalidNoteId)
        return invalidNoteId;
      return null;
    }
    component = new TestNoteComponent(validationService, saveService, store);
    model = new NoteModel("1", "title1", "text1", "1");
    component.model = model;
  });

  it("does update invalid note id", () => 
  {
    invalidNoteId.next("test123");

    expect(component.getInvalidNoteId()).toBe("test123");
  });

  it("does update invalid category id", () => 
  {
    invalidCategoryId.next("test123");

    expect(component.getInvalidCategoryId()).toBe("test123");
  });

  it("does validate the model on title changed", () => 
  {
    let spy = spyOn<any>(component, "validateModel");

    component.handleTitleChanged();

    expect(spy).toHaveBeenCalled();
  });

  it("does set title error on handleValidationResult if title is empty", () => 
  {
    let error = new Dictionary<string>([{ key: "title", value: "testError" }]);

    let result = component.executehandleValidationResult(error);

    expect(result).toBe(false);
    expect(component.titleError).toBe("testError");
  });

  it("does update invalid note id on handleValidationResult if title is empty", () => 
  {
    let error = new Dictionary<string>([{ key: "title", value: "testError" }]);

    component.executehandleValidationResult(error);

    let action: NoteValidityChangeAction = (store.dispatchedActions[0] as NoteValidityChangeAction);
    expect(action.type).toBe(NoteActionKind.NoteValidityChange);
    expect(action.payload).toBe("1");
  });

  it("does unset title error on handleValidationResult if title is not empty", () => 
  {
    let error = new Dictionary<string>([{ key: "title", value: "testError" }]);
    component.executehandleValidationResult(error);
    let result = component.executehandleValidationResult(new Dictionary<string>());

    expect(result).toBe(true);
    expect(nullOrEmpty(component.titleError)).toBe(true);
  });

  it("handleValidationResult does unset invalidNoteId if previous invalidNoteId was id of edited note and title is not empty", () => 
  {
    invalidNoteId.next("1");

    component.executehandleValidationResult(new Dictionary<string>());

    let action: NoteValidityChangeAction = (store.dispatchedActions[0] as NoteValidityChangeAction);
    expect(action.type).toBe(NoteActionKind.NoteValidityChange);
    expect(action.payload).toBeNull();
  });
});
