import { FilterNotesService } from '../../../services/note/filter-notes.service';
import { Component } from '@angular/core';
import { NotesService } from 'src/app/services/note/notes.service';
import { Store } from '@ngrx/store';
import { CategoryModel } from 'src/app/models/categories/categoryModel';
import { coalesce } from 'src/app/util/utility';
import { IApplicationState, getSelectedCategory, getInvalidCategoryId, getInvalidNoteId, getNewNoteId } from 'src/app/redux/state';
import { NoteModel } from 'src/app/models/notes/noteModel';
import { v4 as uuid } from 'uuid';
import { NoteDialogComponent } from '../note-dialog/note-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NewNoteChangeAction } from 'src/app/redux/actions/note/newNoteChangeAction';

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
  private notes: NoteModel[] = [];
  private filterText: string;
  private selectedCategory: CategoryModel;
  private invalidCategoryId: string;
  private invalidNoteId: string;
  private newNoteId: string;

  private _retrievingNotes: boolean = false;
  /**
   * @returns {boolean} Whether notes are currently retrieved
   */
  get retrievingNotes(): boolean { return this._retrievingNotes; }

  private _filteredNotes: NoteModel[];
  /**
   * @returns {NoteModel[]} A list of notes filtered by the search text
   */
  get filteredNotes(): NoteModel[] { return this._filteredNotes; }

  /**
   * Constructor
   * 
   * @param {NotesService} notesService Injected: service for retrieving all notes
   * @param {Store<IApplicationState>} store Injected: redux store
   * @param {FilterNotesService} filterService Injected: service for filtering the notes
   * @param {MatDialog} dialog Injected: service for displaying dialogs
   */
  constructor(notesService: NotesService, private store: Store<IApplicationState>, 
    private filterService: FilterNotesService, private dialog: MatDialog) 
  {
    store.select(getSelectedCategory).subscribe(
      (x: CategoryModel) => this.handleSelectedCategoryChanged(x));
    store.select(getInvalidCategoryId).subscribe((x: string) => this.invalidCategoryId = x);
    store.select(getInvalidNoteId).subscribe((x: string) => this.invalidNoteId = x);
    this.store.select(getNewNoteId).subscribe((x: string) => this.handleNewNoteChanged(x));

    notesService.get((x: NoteModel[]) => this.handleNotesChanged(x));
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
  handleAddButtonClicked() 
  { 
    if (this.invalidCategoryId == null && this.invalidNoteId == null)
    {
      let model = new NoteModel(uuid(), "", "", this.selectedCategory.id);
      this.filteredNotes.push(model);
      this.openEditDialog(model);
      this.newNoteId = model.id;
      this.store.dispatch(new NewNoteChangeAction(model.id));
    }
  }

  private openEditDialog(model: NoteModel)
  {
    this.dialog.open(NoteDialogComponent, { 
      data: model,
      panelClass: 'fullscreenDialog',
      disableClose: true
    });
  }

  private handleNotesChanged(notes: NoteModel[]) 
  {
    this.notes = notes.sort((a, b) => a.timestamp - b.timestamp);
    this.filterNotes(); 
  }

  private handleSelectedCategoryChanged(category: CategoryModel) 
  {
    this._retrievingNotes = true;
    this.selectedCategory = category;
    this.filterNotes();
    setTimeout(() => this._retrievingNotes = false, 1000)
  }

  private handleNewNoteChanged(noteId: string)
  {
    if (this.newNoteId != null && this.newNoteId  != noteId)
    {
      let index = this.filteredNotes.findIndex(item => item.id == this.newNoteId);
      this.filteredNotes.splice(index);
    }
    this.newNoteId = noteId;
  }

  private filterNotes()
  {
    if (this.selectedCategory == null)
      return;

    this._filteredNotes = this.filterService.filter(this.notes, this.filterText, 
      this.selectedCategory.id).slice(0, 11)
  }
}