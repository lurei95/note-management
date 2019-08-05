import { PriorityKind } from './priorityKind';
import { NoteModel } from "./noteModel";

describe("NoteModel", () =>
{
  function equalTestCore(id: string, title: string, text: string, categoryId: string, date: Date, 
    priority: PriorityKind, tags: string[], expectedResult: boolean)
  { 
    let note1 = new NoteModel("1", "title1", "text1", "2", new Date(2019, 11, 5), PriorityKind.Low);
    note1.tags.push("tag1", "tag2");
    let note2 = new NoteModel(id, title, text, categoryId, date, priority);
    note2.tags = tags;

    expect(note1.equals(note2)).toBe(expectedResult); 
  }

  it("clone clones the NoteModel", () =>
  {
    let note = new NoteModel("1", "title1", "text1", "2", new Date(2019, 11, 5));
    note.tags.push("tag1", "tag2");

    let copy = note.clone();

    expect(copy.id).toBe("1");
    expect(copy.title).toBe("title1");
    expect(copy.text).toBe("text1");
    expect(copy.categoryId).toBe("2");
    expect(copy.dueDate).toEqual(note.dueDate);
    expect(copy.dueDate === note.dueDate).toBe(false);
    expect(copy.tags).toEqual(note.tags);
    expect(copy.tags === note.tags).toBe(false);
  });

  it("equals returns true if notes are equal", () =>
  {
    equalTestCore("1", "title1", "text1", "2", new Date(2019, 11, 5), PriorityKind.Low, 
      ["tag1", "tag2"], true);
  });

  it("equals returns false if id differs", () =>
  {
    equalTestCore("2", "title1", "text1", "2", new Date(2019, 11, 5), PriorityKind.Low, 
      ["tag1", "tag2"], false);
  });

  it("equals returns false if title differs", () =>
  {
    equalTestCore("1", "other title", "text1", "2", new Date(2019, 11, 5), PriorityKind.Low, 
      ["tag1", "tag2"], false);
  });

  it("equals returns false if text differs", () =>
  {
    equalTestCore("1", "title1", "other text", "2", new Date(2019, 11, 5), PriorityKind.Low, 
      ["tag1", "tag2"], false);
  });

  it("equals returns false if categoryId differs", () =>
  {
    equalTestCore("1", "title1", "text1", "3", new Date(2019, 11, 5), PriorityKind.Low, 
      ["tag1", "tag2"], false);
  });

  it("equals returns false if date differs", () =>
  {
    equalTestCore("1", "title1", "text1", "2", new Date(2014, 5, 12), PriorityKind.Low, 
      ["tag1", "tag2"], false);
  });

  it("equals returns false if priority differs", () =>
  {
    equalTestCore("1", "title1", "text1", "2", new Date(2019, 11, 5), PriorityKind.High, 
      ["tag1", "tag2"], false);
  });

  it("equals returns false if tags differ", () =>
  {
    equalTestCore("1", "title1", "text1", "2", new Date(2019, 11, 5), PriorityKind.Low, 
      ["tag1", "tag3"], false);
  });
});