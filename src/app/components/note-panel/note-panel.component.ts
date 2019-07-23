import { FilterNotesService } from '../../services/note/filter-notes.service';
import { CategoryDisplayModel } from '../../models/categoryModel';
import { AddNoteService } from '../../services/note/add-note.service';
import { getNotes, getSearchText, getSelectedCatgeory } from '../../redux/reducers/index';
import { NoteDisplayModel } from '../../models/noteModel';
import { Component, OnInit } from '@angular/core';
import { RetrieveNotesService } from 'src/app/services/note/retrieve-notes.service';
import { IApplicationState } from 'src/app/redux/reducers';
import { Store } from '@ngrx/store';
import { RetrieveCategoriesService } from 'src/app/services/category/retrieve-categories.service';

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
  private notes: NoteDisplayModel[];
  private searchText: string;
  private selectedCategory: CategoryDisplayModel;

  private _filteredNotes: NoteDisplayModel[];
  /**
   * @returns {NoteDisplayModel[]} A list of notes filtered by the search text
   */
  get filteredNotes(): NoteDisplayModel[] { return this._filteredNotes; }

  /**
   * @returns {string} The title of the selected category
   */
  get title(): string { return this.selectedCategory == null ? "" : this.selectedCategory.title; }

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
    store.select(state => getSearchText("Note", state)).subscribe(
      (x: string) => this.handleSearchTextChanged(x));
    store.select(getNotes).subscribe(
      (x: NoteDisplayModel[]) => this.handleNotesChanged(x));
    store.select(state => getSelectedCatgeory(state)).subscribe(
      (x: CategoryDisplayModel) => this.handleSelectedCategoryChanged(x)); 

    categoriesService.execute();
    notesService.execute();
  }

  /**
   * Event handler: adds a new note
   */
  onAddButtonClicked() 
  { 
    let selectedNote = this.notes.filter(note => note.isEditing)[0];
    if (selectedNote == null || selectedNote.isValid())
      this.addService.execute(this.selectedCategory.id); 
  }

  private handleNotesChanged(notes: NoteDisplayModel[]) 
  {
    this.notes = notes;
    this.filterNotes(); 
  }

  private handleSelectedCategoryChanged(category: CategoryDisplayModel) 
  {
    this.selectedCategory = category;
    this.filterNotes();
  }

  private handleSearchTextChanged(searchText: string) 
  {
    if (this.searchText != searchText)
    {
      this.searchText = searchText;
      this.filterNotes(); 
    }
  }

  private filterNotes() 
  {
    if (this.selectedCategory == null)
      return;

    this._filteredNotes = this.filterService.filter(this.notes, this.searchText, 
      this.selectedCategory.id)
  }
}