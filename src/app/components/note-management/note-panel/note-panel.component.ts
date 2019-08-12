import { Component } from '@angular/core';
import { NotesService } from 'src/app/services/note/notes.service';
import { Store } from '@ngrx/store';
import { CategoryModel } from 'src/app/models/categories/categoryModel';
import { nullOrEmpty } from 'src/app/util/utility';
import { IApplicationState, getSelectedCategory, getInvalidCategoryId, getInvalidNoteId } from 'src/app/redux/state';
import { NoteModel } from 'src/app/models/notes/noteModel';
import { v4 as uuid } from 'uuid';
import { NoteDialogComponent } from '../note-dialog/note-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable, concat, of } from 'rxjs';

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
  private filterText: string;
  private selectedCategory: CategoryModel;
  private invalidCategoryId: string;
  private invalidNoteId: string;

  private filterFunc = (note: NoteModel) => 
  {
    if (!nullOrEmpty(this.filterText))
      return note.categoryId == this.selectedCategory.id
        && this.matchesSearchText(note, this.filterText);
    else
      return note.categoryId == this.selectedCategory.id;
  }

  private _notes: Observable<NoteModel[]>;
  /**
   * @returns {Observable<NoteModel[]>} Observable for the displayed notes
   */
  public get notes(): Observable<NoteModel[]> { return this._notes; }

  private _retrievingNotes: boolean = false;
  /**
   * @returns {boolean} Whether notes are currently retrieved
   */
  get retrievingNotes(): boolean { return this._retrievingNotes; }

  /**
   * Constructor
   * 
   * @param {NotesService} notesService Injected: service for retrieving all notes
   * @param {Store<IApplicationState>} store Injected: redux store
   * @param {MatDialog} dialog Injected: service for displaying dialogs
   */
  constructor(private notesService: NotesService, private store: Store<IApplicationState>,
    private dialog: MatDialog) 
  {
    store.select(getSelectedCategory).subscribe(
      (x: CategoryModel) => this.handleSelectedCategoryChanged(x));
    store.select(getInvalidCategoryId).subscribe((x: string) => this.invalidCategoryId = x);
    store.select(getInvalidNoteId).subscribe((x: string) => this.invalidNoteId = x);

    this.updateSubscription();
  }

  /**
   * Event handler: filters the notes
   * 
   * @param {string} filterText The new filter text
   */
  handleFilterTextChanged(filterText: string) 
  {
    if (this.filterText != filterText)
    {
      this.filterText = filterText;
      this.updateSubscription();
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
      this.openEditDialog(model);
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

  private handleSelectedCategoryChanged(category: CategoryModel) 
  {
    this._retrievingNotes = true;
    this.selectedCategory = category;
    this.updateSubscription();
  }

  private matchesSearchText(note: NoteModel, filterText: string)
  {
    return note.title.toUpperCase().includes(filterText.toUpperCase()) 
      || note.tags.some(tag => tag.toUpperCase() == filterText.toUpperCase());
  }

  private updateSubscription()
  { 
    this._notes = this.notesService.get(this.filterFunc);
    this._notes.subscribe(() => 
    {
      if (this.retrievingNotes)
        setTimeout(() => this._retrievingNotes = false, 1000)
    });
  }
}