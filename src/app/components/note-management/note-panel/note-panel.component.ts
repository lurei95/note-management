import { Component, ElementRef, ViewChild } from '@angular/core';
import { NotesService } from '../../../services/note/notes.service';
import { Store } from '@ngrx/store';
import { CategoryModel } from '../../../models/categories/categoryModel';
import { nullOrEmpty } from '../../../util/utility';
import { IApplicationState, getSelectedCategory, getInvalidCategoryId, getInvalidNoteId } from '../../../redux/state';
import { NoteModel } from '../../../models/notes/noteModel';
import { v4 as uuid } from 'uuid';
import { NoteDialogComponent } from '../note-dialog/note-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ComponentBase } from '../../componentBase';
import { HostListener, AfterViewInit } from '@angular/core';

/**
 * Component of a panel for displaying notes
 */
@Component({
  selector: 'app-note-panel',
  templateUrl: './note-panel.component.html',
  styleUrls: ['./note-panel.component.css']
})
export class NotePanelComponent extends ComponentBase implements AfterViewInit
{
  private filterText: string;
  private selectedCategory: CategoryModel;
  private invalidCategoryId: string;
  private invalidNoteId: string;

  @ViewChild("panel", {static: false}) private panel: ElementRef;

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
  constructor(private notesService: NotesService, store: Store<IApplicationState>,
    private dialog: MatDialog) 
  {
    super();
    store.select(getSelectedCategory).pipe(takeUntil(this.unsubscribe))
      .subscribe((x: CategoryModel) => this.handleSelectedCategoryChanged(x));
    store.select(getInvalidCategoryId).pipe(takeUntil(this.unsubscribe))
      .subscribe((x: string) => this.invalidCategoryId = x);
    store.select(getInvalidNoteId).pipe(takeUntil(this.unsubscribe))
      .subscribe((x: string) => this.invalidNoteId = x);

    this.updateSubscription();
  }

  public ngAfterViewInit() { this.onResize(null); }

  /**
   * Event handler: filters the notes
   * 
   * @param {string} filterText The new filter text
   */
  public handleFilterTextChanged(filterText: string) 
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
  public handleAddButtonClicked() 
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
        setTimeout(() => this._retrievingNotes = false, 1000);
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    let notePanelHeight = window.innerHeight - 150;
    this.panel.nativeElement.style.height = notePanelHeight + "px";
  }
}