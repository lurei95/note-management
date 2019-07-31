import { LocalizationServiceMock } from './../mocks/localizationServiecMock';
import { MessageKind } from 'src/app/messageKind';
import { ValidateNoteService } from './validate-note.service';
import { NoteModel } from 'src/app/models/noteModel';

describe('ValidateNoteService', () => 
{
  let mockService: LocalizationServiceMock;
  let service: ValidateNoteService;

  beforeEach(() =>
  {
    mockService = new LocalizationServiceMock();
    service = new ValidateNoteService(mockService);
  });

  it("should return no error when the note is valid", () => 
  {
    const model = new NoteModel("test-id", "test-title");

    const result = service.execute(model);

    expect(result.keys.length).toBe(0);
  });

  it("should return error when the title is empty", () => 
  {
    const model = new NoteModel("test-id");
    mockService.returnValue = "test-error";

    const result = service.execute(model);

    expect(result.keys.length).toBe(1);
    expect(mockService.names[0]).toBe(MessageKind.RequiredField);
    expect(result["title"]).toBe("test-error");
  });
});
