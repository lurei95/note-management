import { Injectable } from '@angular/core';
import { nullOrEmpty } from 'src/app/util/utility';
import { NoteModel } from 'src/app/models/noteModel';

/**
 * Service for filtering the notes of a category by a search text
 */
@Injectable({
  providedIn: 'root'
})
export class FilterNotesService
{
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
    if (!nullOrEmpty(filterText))
      return notes.filter(note => note.categoryId == categoryId 
        && this.matchesSearchText(note, filterText));
    else
      return notes.filter(note => note.categoryId == categoryId);
  }

  private matchesSearchText(note: NoteModel, filterText: string)
  {
    return note.title.toUpperCase().includes(filterText.toUpperCase()) 
      || note.tags.some(tag => tag.toUpperCase() == filterText.toUpperCase());
  }
}