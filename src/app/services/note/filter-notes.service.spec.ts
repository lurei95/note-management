import { FilterNotesService } from './filter-notes.service';
import { NoteModel } from 'src/app/models/notes/noteModel';

describe('FilterNotesService', () => 
{
  let service: FilterNotesService;
  let items: NoteModel[];

  beforeEach(() => 
  {
    service = new FilterNotesService();
    let item3 = new NoteModel("3", "ggghhhiii", null, "1");
    item3.tags.push("aa");
    items = [
      new NoteModel("1", "aaabbbccc", null, "1"), 
      new NoteModel("2", "dddeeefff", null, "1"), 
      item3, 
      new NoteModel("4", "aaa", null, "2")
    ];
  });

  it('should return all elements if search text empty', () => 
  {
    let result = service.filter(items, "", "1");

    expect(result).toContain(items[0]);
    expect(result).toContain(items[1]);
    expect(result).toContain(items[2]);
  });

  it('should return all elements that contain the search text', () => 
  {
    let result = service.filter(items, "aa", "1");

    expect(result).toContain(items[0]);
    expect(result).toContain(items[2]);
  });
});
