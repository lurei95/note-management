import { Subject } from 'rxjs';
import { StoreMock } from '../../services/mocks/storeMock';
import { UserModel } from '../../models/users/userModel';
import { getUser, getInvalidCategoryId, getInvalidNoteId } from '../../redux/state';
import { MessageKind } from '../../messageKind';
import { NotesService } from './notes.service';
import { NoteModel } from '../../models/notes/noteModel';
import { NoteValidityChangeAction } from '../../redux/actions/note/noteValidityChangeAction';
import { NoteActionKind } from '../../redux/actions/note/noteActionKind';

describe('NotesService', () => 
{
  let service: NotesService;
  let model: NoteModel;
  let currentUser = new Subject<UserModel>();
  let invalidNoteId = new Subject<string>();
  let store: StoreMock = new StoreMock();
  let databaseServiceMock: any = 
  { 
    getCollection(): any {},
    getItem(): any {},
    deleteItem(): any {},
    updateItem(): any {}
  }
  let localizationServiceMock: any = { execute(): any { } }
  let notificationServiceMock: any = { notifySuccessMessage(): any { } }

  beforeEach(() => 
  {
    store = new StoreMock();
    model = new NoteModel("1", "title1");
    model.timestamp = 1;
    store.resultSelector = (selector) =>
    {
      if (selector == getUser)
        return currentUser;
      else if (selector == getInvalidNoteId)
        return invalidNoteId;
      return null;
    };
    service = new NotesService(store, databaseServiceMock, notificationServiceMock, 
      localizationServiceMock);
    currentUser.next(new UserModel({ uid: "1", email: "test@test.com" }));
  });

  it('should be created', () => expect(service).toBeTruthy());

  it("delete deletes the model", () => 
  {
    spyOn(databaseServiceMock, "getCollection").and.returnValue("test");
    let spy = spyOn(databaseServiceMock, "deleteItem");

    service.delete(model);

    expect(spy).toHaveBeenCalledWith("1", "test");
  });

  it("delete unsets the invalid note", () => 
  {
    service.delete(model);
    invalidNoteId.next("1");

    let action: NoteValidityChangeAction = store.dispatchedActions
      .find(item => item instanceof NoteValidityChangeAction) as NoteValidityChangeAction;
    expect(action.payload).toBeNull();
    expect(action.type).toBe(NoteActionKind.NoteValidityChange);
  });

  it("delete displays a success message", () => 
  {
    let spy1 = spyOn(localizationServiceMock, "execute").and.returnValue("test");
    let spy2 = spyOn(notificationServiceMock, "notifySuccessMessage");

    service.delete(model);

    expect(spy1.calls.first().args[0]).toBe(MessageKind.DeleteNoteMessage);
    expect((spy1.calls.first().args[1] as { title: string }).title).toBe("title1");
    expect(spy2).toHaveBeenCalledWith("test");
  });

  it("save saves the model", () => 
  {
    spyOn(databaseServiceMock, "getCollection").and.returnValue("test");
    let spy = spyOn(databaseServiceMock, "updateItem");

    service.save(model);

    expect(spy).toHaveBeenCalledWith("1", "test", model);
  });

  it("save displays a success message", () => 
  {
    let spy1 = spyOn(localizationServiceMock, "execute").and.returnValue("test");
    let spy2 = spyOn(notificationServiceMock, "notifySuccessMessage");

    service.save(model);

    expect(spy1.calls.first().args[0]).toBe(MessageKind.SaveNoteMessage);
    expect((spy1.calls.first().args[1] as { title: string }).title).toBe("title1");
    expect(spy2).toHaveBeenCalledWith("test");
  });

  it("validate returns an empty dictionary if the note is valid", () => 
  {
    let result = service.validate(model);
    expect(result.keys.length).toBe(0);
  });

  it("validate returns an error if the title is empty", () => 
  {
    let spy = spyOn(localizationServiceMock, "execute").and.returnValue("test");

    let result = service.validate(new NoteModel("1"));

    expect(spy).toHaveBeenCalledWith(MessageKind.RequiredField);
    expect(result.keys.length).toBe(1);
    expect(result["title"]).toBe("test");
  });
});