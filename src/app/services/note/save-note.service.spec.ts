import { LocalizationServiceMock } from '../mocks/localizationServiecMock';
import { NotificationServiceMock } from '../mocks/notificationServiceMock';
import { StoreMock } from '../mocks/storeMock';
import { MessageKind } from 'src/app/messageKind';
import { SaveNoteService } from './save-note.service';
import { NoteModel } from 'src/app/models/noteModel';
import { NoteActionKind } from 'src/app/redux/actions/note/noteActionKind';
import { NoteAction } from 'src/app/redux/actions/note/noteAction';

describe('SaveNoteService', () =>
{
  let localizationService: LocalizationServiceMock;
  let notificationService: NotificationServiceMock;
  let storeMock: StoreMock;
  let service: SaveNoteService;
  let model: NoteModel;

  beforeEach(() =>
  {
    model = new NoteModel("test-id", "test-title");
    localizationService = new LocalizationServiceMock();
    notificationService = new NotificationServiceMock();
    storeMock = new StoreMock();
    service = new SaveNoteService(storeMock, localizationService, notificationService);
  });

  it('note should be saved', () => 
  {
    service.execute(model);

    let action = (storeMock.dispatchedActions[0] as NoteAction);
    expect(action.type).toBe(NoteActionKind.NoteUpdate);
    expect(action.payload).toBe(model);
  });

  it('the saving of the changes should be notified', () => 
  {
    localizationService.returnValue = "test-notification"

    service.execute(model);

    expect(localizationService.name).toBe(MessageKind.SaveNoteMessage);
    expect(localizationService.parameter).toEqual({ title: "test-title" });
    expect(notificationService.successMessage).toBe("test-notification");
  });

  it('title should be truncated', () => 
  {
    localizationService.returnValue = "test-notification";
    model.title = "test-title1234";

    service.execute(model);

    expect(localizationService.parameter).toEqual({ title: "test-title..." });
  });
});
