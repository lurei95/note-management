import { FilterNotesService } from '../../services/note/filter-notes.service';
import { AddNoteService } from '../../services/note/add-note.service';
import { Component } from '@angular/core';
import { RetrieveNotesService } from 'src/app/services/note/retrieve-notes.service';
import { Store } from '@ngrx/store';
import { RetrieveCategoriesService } from 'src/app/services/category/retrieve-categories.service';
import { CategoryModel } from 'src/app/models/categoryModel';
import { coalesce } from 'src/app/util/utility';
import { IApplicationState, getNotes, getSelectedCatgeory, getInvalidCategoryId, getInvalidNoteId } from 'src/app/redux/state';
import { NoteModel } from 'src/app/models/noteModel';

/**
 * Component pf panel for displaying notes
 */
@Component({
  selector: 'app-note-panel',
  templateUrl: './note-panel.component.html',
  styleUrls: ['./note-panel.component.css']
})
export class NotePanelComponent
{
  private notes: NoteModel[];
  private filterText: string;
  private selectedCategory: CategoryModel;
  private invalidCategoryId: string;
  private invalidNoteId: string;

  private _filteredNotes: NoteModel[];
  /**
   * @returns {NoteModel[]} A list of notes filtered by the search text
   */
  get filteredNotes(): NoteModel[] { return this._filteredNotes; }

  /**
   * @returns {string} The title of the selected category
   */
  get title(): string { return coalesce(this.selectedCategory.title, ""); }

  /**
   * Constructor
   * 
   * @param {RetrieveNotesService} notesService Injected: service for retrieving all notes
   * @param {RetrieveCategoriesService} categoriesService Injected: service for retrieving all categories
   * @param {AddNoteService} addService Injected: service for adding a new note
   * @param {Store<IApplicationState>} store Injected: redux store
   * @param {FilterNotesService} filterService Injected: service for filtering the notes
   */
  constructor(notesService: RetrieveNotesService, categoriesService: RetrieveCategoriesService,
    private addService: AddNoteService, store: Store<IApplicationState>, 
    private filterService: FilterNotesService) 
  {
    store.select(getNotes).subscribe(
      (x: NoteModel[]) => this.handleNotesChanged(x));
    store.select(state => getSelectedCatgeory(state)).subscribe(
      (x: CategoryModel) => this.handleSelectedCategoryChanged(x));
    store.select(getInvalidCategoryId).subscribe((x: string) => this.invalidCategoryId = x);
    store.select(getInvalidNoteId).subscribe((x: string) => this.invalidNoteId = x);

    categoriesService.execute();
    notesService.execute();
  }

  /**
   * Event handler: filters the notes
   */
  handleFilterTextChanged(filterText: string) 
  {
    if (this.filterText != filterText)
    {
      this.filterText = filterText;
      this.filterNotes(); 
    }
  }

  /**
   * Event handler: adds a new note
   */
  onAddButtonClicked() 
  { 
    if (this.invalidCategoryId == null && this.invalidNoteId == null)
      this.addService.execute(this.selectedCategory.id); 
  }

  private handleNotesChanged(notes: NoteModel[]) 
  {
    this.notes = notes;
    this.filterNotes(); 
  }

  private handleSelectedCategoryChanged(category: CategoryModel) 
  {
    this.selectedCategory = category;
    this.filterNotes();
  }

  private filterNotes() 
  {
    if (this.selectedCategory == null)
      return;

    this._filteredNotes = this.filterService.filter(this.notes, this.filterText, 
      this.selectedCategory.id).slice(0, 11)
  }
}