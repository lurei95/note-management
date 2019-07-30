import { FilterNotesService } from '../note/filter-notes.service';
import { NoteModel } from 'src/app/models/noteModel';

/**
 * Mock service for {@link FilterNotesService}
 */
export class FilterNotesServiceMock extends FilterNotesService
{
  /**
   * The categories the service was called with
   */
  notes: NoteModel[] = [];
  /**
   * The filterText the service was called with
   */
  filterText: string;
  /**
   * The selectedCategoryId the service was called with
   */
  categoryId: string;

  /**
   * Filters the notes of a category by a search text
   * 
   * @param {NoteModel[]} notes Notes to filter
   * @param {string} filterText Search text to use for filtering the notes
   * @param {string} categoryId ID of the category the notes belong to
   * @returns {NoteModel[]} The filtered list of notes
   */
  filter (notes: NoteModel[], filterText: string, categoryId: string): NoteModel[]
  {
    this.notes = notes;
    this.filterText = filterText;
    this.categoryId = categoryId;
    return notes;
  }
}