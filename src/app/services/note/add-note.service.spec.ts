import { MatDialogMock } from './../mocks/matDialogMock';
import { StoreMock } from '../mocks/storeMock';
import { nullOrEmpty } from 'src/app/util/utility';
import { AddNoteService } from './add-note.service';
import { NoteAction } from 'src/app/redux/actions/note/noteAction';
import { NoteActionKind } from 'src/app/redux/actions/note/noteActionKind';

describe('AddNoteService', () =>
{
  let storeMock: StoreMock;
  let dialogMock: MatDialogMock;
  let service: AddNoteService;

  beforeEach(() =>
  {
    storeMock = new StoreMock();
    dialogMock = new MatDialogMock();
    service = new AddNoteService(storeMock, dialogMock);
  });

  it('note should be added', () => 
  {
    service.execute("2");
    
    let action = (storeMock.dispatchedActions[0] as NoteAction);
    expect(action.type).toBe(NoteActionKind.NoteAdd);
    expect(!nullOrEmpty(action.payload.id)).toBe(true);
    expect(action.payload.categoryId).toBe("2");
  });
});
