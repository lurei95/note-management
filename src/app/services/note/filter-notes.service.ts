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
   * @param {string} searchText Search text to use for filtering the notes
   * @param {string} categoryId ID of the category the notes belong to
   * @returns {NoteModel[]} The filtered list of notes
   */
  filter (notes: NoteModel[], searchText: string, categoryId: string): NoteModel[]
  {
    if (!nullOrEmpty(searchText))
      return notes.filter(note => note.categoryId == categoryId 
        && this.matchesSearchText(note, searchText));
    else
      return notes.filter(note => note.categoryId == categoryId);
  }

  private matchesSearchText(note: NoteModel, searchText: string)
  {
    return note.title.toUpperCase().includes(searchText.toUpperCase()) 
      || note.tags.some(tag => tag.toUpperCase() == searchText.toUpperCase());
  }
}