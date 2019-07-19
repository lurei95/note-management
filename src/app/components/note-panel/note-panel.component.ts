import { CategoryDisplayModel } from './../../models/categoryModel';
import { AddNoteService } from './../../services/note/add-note.service';
import { getNotes, getSearchText, getSelectedCatgeory } from './../../redux/reducers/index';
import { NoteDisplayModel } from '../../models/noteModel';
import { Component, OnInit } from '@angular/core';
import { RetrieveNotesService } from 'src/app/services/note/retrieve-notes.service';
import { IApplicationState } from 'src/app/redux/reducers';
import { Store } from '@ngrx/store';
import { RetrieveCategoriesService } from 'src/app/services/category/retrieve-categories.service';
import { nullOrEmpty } from 'src/app/util/utility';

@Component({
  selector: 'app-note-panel',
  templateUrl: './note-panel.component.html',
  styleUrls: ['./note-panel.component.css']
})
export class NotePanelComponent implements OnInit 
{
  private notes: NoteDisplayModel[];
  private searchText: string;

  private _filteredNotes: NoteDisplayModel[];
  get filteredNotes() { return this._filteredNotes; }

  private _selectedCategory: CategoryDisplayModel;
  get selectedCategory() { return this._selectedCategory; }

  constructor(private notesService: RetrieveNotesService, categoriesService: RetrieveCategoriesService,
    private addService: AddNoteService, store: Store<IApplicationState>) 
  {
    categoriesService.execute();

    store.select(state => getSearchText("Note", state)).subscribe(
      (x: string) => this.handleSearchTextChanged(x));
    store.select(getNotes).subscribe(
      (x: NoteDisplayModel[]) => this.handleNotesChanged(x));
    store.select(state => getSelectedCatgeory(state)).subscribe(
      (x: CategoryDisplayModel) => this.handleSelectedCategoryChanged(x)); 
  }

  private handleNotesChanged(notes: NoteDisplayModel[]) 
  {
    this.notes = notes;
    this.filterNotes(notes); 
  }

  private handleSelectedCategoryChanged(category: CategoryDisplayModel) 
  {
    this._selectedCategory = category;
    this.notesService.execute(category.id);
  }

  private handleSearchTextChanged(searchText: string) 
  {
    if (this.searchText != searchText)
    {
      this.searchText = searchText;
      this.filterNotes(this.notes); 
    }
  }

  private filterNotes(notes: NoteDisplayModel[]) 
  {
    if (!nullOrEmpty(this.searchText))
      this._filteredNotes = notes.filter(
        note => note.title.toUpperCase().includes(this.searchText.toUpperCase())
      );
    else
      this._filteredNotes = notes;
  }

  ngOnInit() { }

  onAddButtonClicked() 
  { 
    let selectedNote = this.notes.filter(note => note.isEditing)[0];
    if (selectedNote == null || selectedNote.isValid())
      this.addService.execute(this.selectedCategory.id); 
  }
}