import { ValidationServiceMock } from './../services/mocks/validationServiceMock';
import { NoteModel } from '../models/noteModel';
import { EditableComponent } from './editableComponent';
import { SaveServiceMock } from '../services/mocks/saveServiceMock';
import { Dictionary } from '../util/dictionary';

describe('EditableComponent', () =>
{
  class TestEditableComponent extends EditableComponent<NoteModel>
  {
    validationResult: Dictionary<string> 

    get unmodifiedModel() { return this.unmodified; }

    protected handleValidationResult(result: Dictionary<string>): boolean 
    {
      this.validationResult = result;
      return result.keys.length == 0;
    }

    executeTrySaveChanges() { return this.trySaveChanges(); }
  }

  let component: TestEditableComponent;
  let saveService: SaveServiceMock<NoteModel>
  let validationService: ValidationServiceMock<NoteModel>
  let model: NoteModel;

  beforeEach(() =>
  {
    saveService = new SaveServiceMock();
    validationService = new ValidationServiceMock();
    component = new TestEditableComponent(validationService, saveService);
    model = new NoteModel("1", "title1", "text1", "1");
    component.model = model;
  });

  it("setting the model clones it as an unmodified version", () => 
  {
    expect(component.unmodifiedModel).toEqual(model);
    expect(component.unmodifiedModel == model).toBe(false);
  });

  it("hasChanges returns false if the model equals the unmodified version", () => 
  { expect(component.hasChanges()).toBe(false); });

  it("hasChanges returns true if the model does not equal the unmodified version", () => 
  { 
    model.title = "newTitle";

    expect(component.hasChanges()).toBe(true); 
  });

  it("trySaveChanges does not save changes if validation is not successful", () => 
  { 
    model.title = "newTitle";
    let validationResult = new Dictionary<string>([{ key: "title", value: "title is wrong"}]);
    validationService.result = validationResult;

    let result = component.executeTrySaveChanges();

    expect(result).toBe(false); 
    expect(validationService.parameter).toBe(model);
    expect(saveService.parameter).toBeUndefined();
    expect(component.validationResult).toBe(validationResult);
  });

  it("trySaveChanges returns true but does not call the save service if there are no changes", () => 
  { 
    let validationResult = new Dictionary<string>();
    validationService.result = validationResult;

    let result = component.executeTrySaveChanges();

    expect(result).toBe(true); 
    expect(validationService.parameter).toBe(model);
    expect(saveService.parameter).toBeUndefined();
    expect(component.validationResult).toBe(validationResult);
  });

  it("trySaveChanges saves changes if validation is successful", () => 
  { 
    model.title = "newTitle";
    let validationResult = new Dictionary<string>();
    validationService.result = validationResult;

    let result = component.executeTrySaveChanges();

    expect(result).toBe(true); 
    expect(validationService.parameter).toBe(model);
    expect(saveService.parameter).toBe(model);
    expect(component.validationResult).toBe(validationResult);
  });

  it("handleSaveChanges calls trySaveChanges and disables the propagation of the event", () => 
  { 
    let validationResult = new Dictionary<string>();
    validationService.result = validationResult;
    let event = new Event("test");
    let spy1 = spyOn<any>(component, "trySaveChanges");
    let spy2 = spyOn<any>(event, "stopPropagation");
    let spy3 = spyOn<any>(event, "preventDefault");

    component.handleSaveShortcut(event);

    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(spy3).toHaveBeenCalled();
  });
});
