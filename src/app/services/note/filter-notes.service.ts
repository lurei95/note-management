import { NoteDisplayModel } from 'src/app/models/noteModel';
import { Injectable } from '@angular/core';
import { nullOrEmpty } from 'src/app/util/utility';

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
   * @param {NoteDisplayModel[]} notes Notes to filter
   * @param {string} searchText Search text to use for filtering the notes
   * @param {string} categoryId ID of the category the notes belong to
   * @returns {NoteDisplayModel[]} The filtered list of notes
   */
  filter (notes: NoteDisplayModel[], searchText: string, categoryId: string): NoteDisplayModel[]
  {
    if (!nullOrEmpty(searchText))
      return notes.filter(note => note.categoryId == categoryId 
        && this.matchesSearchText(note, searchText));
    else
      return notes.filter(note => note.categoryId == categoryId);
  }

  private matchesSearchText(note: NoteDisplayModel, searchText: string)
  {
    return note.title.toUpperCase().includes(searchText.toUpperCase()) 
      || note.tags.some(tag => tag.toUpperCase() == searchText.toUpperCase());
  }
}