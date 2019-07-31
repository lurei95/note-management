
import { LocalizationServiceMock } from '../mocks/localizationServiecMock';
import { NotificationServiceMock } from '../mocks/notificationServiceMock';
import { StoreMock } from '../mocks/storeMock';
import { MessageKind } from 'src/app/messageKind';
import { of } from 'rxjs';
import { NoteActionKind } from 'src/app/redux/actions/note/noteActionKind';
import { NoteModel } from 'src/app/models/noteModel';
import { DeleteNoteService } from './delete-note.service';
import { NoteValidityChangeAction } from 'src/app/redux/actions/note/noteValidityChangeAction';
import { getInvalidNoteId } from 'src/app/redux/state';
import { NoteAction } from 'src/app/redux/actions/note/noteAction';

describe('DeleteNoteService', () =>
{
  let localizationService: LocalizationServiceMock;
  let notificationService: NotificationServiceMock;
  let storeMock: StoreMock;
  let service: DeleteNoteService;
  let model: NoteModel;

  beforeEach(() =>
  {
    model = new NoteModel("1");
    localizationService = new LocalizationServiceMock();
    notificationService = new NotificationServiceMock();
    storeMock = new StoreMock();
    storeMock.resultSelector = (selector) => 
    {
      if (selector == getInvalidNoteId)
        return of("1");
      else 
        return of({});
    };
    service = new DeleteNoteService(storeMock, notificationService, localizationService);
  });

  it('note should be deleted', () => 
  {
    service.execute(model);
    
    let action = (storeMock.dispatchedActions[0] as NoteAction);
    expect(action.type).toBe(NoteActionKind.NoteDelete);
    expect(action.payload).toBe(model);
  });

  it('invalid note id should be removed', () => 
  {
    service.execute(model);
    
    let action = (storeMock.dispatchedActions[1] as NoteValidityChangeAction);
    expect(action.type).toBe(NoteActionKind.NoteValidityChange);
    expect(action.payload).toBe(null);
  });

  it('the deletion of the note should be notified', () => 
  {
    localizationService.returnValue = "test-notification"

    service.execute(model);

    expect(localizationService.names[0]).toBe(MessageKind.DeleteNoteMessage);
    expect(localizationService.parameters[0]).toEqual({ title: "" });
    expect(notificationService.successMessage).toBe("test-notification");
  });

  it('title should be truncated', () => 
  {
    localizationService.returnValue = "test-notification";
    model.title = "test-title1234";

    service.execute(model);

    expect(localizationService.parameters[0]).toEqual({ title: "test-title..." });
  });
});
