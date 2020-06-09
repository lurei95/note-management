import { WaitPanelComponent } from './../../utiltity/wait-panel/wait-panel.component';
import { MatDialog } from '@angular/material/dialog';
import { Store, ScannedActionsSubject } from '@ngrx/store';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FilterInputComponent } from '../../utiltity/filter-input/filter-input.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NotePanelComponent } from './note-panel.component';
import { StoreMock } from '../../../services/mocks/storeMock';
import { Subject } from 'rxjs';
import { CategoryModel } from '../../../models/categories/categoryModel';
import { NotesService } from '../../../services/note/notes.service';
import { getInvalidCategoryId, getInvalidNoteId, getSelectedCategory } from '../../../redux/state';
import { NoteComponent } from '../note/note.component';
import { FormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoteModel } from '../../../models/notes/noteModel';
import { MessageDialogService } from '../../../services/message-dialog.service';
import { LocalizationService } from '../../../services/localization.service';
import { NotificationService } from '../../../services/notification/notificationService';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoteActionKind } from '../../../redux/actions/note/noteActionKind';
import { TranslatePipeMock } from '../../../services/mocks/translatePipeMock';

describe('NotePanelComponent', () => 
{
  let component: NotePanelComponent;
  let fixture: ComponentFixture<NotePanelComponent>;
  let storeMock: StoreMock;
  let notesServiceMock: any = { get() {} };
  let invalidCategoryId: Subject<string>;
  let invalidNoteId: Subject<string>;
  let newNoteId: Subject<string>;
  let selectedCategory: Subject<CategoryModel>;
  let notes: NoteModel[];
  let getSpy: jasmine.Spy<any>;
  let dialogSpy: jasmine.Spy<any>;

  beforeEach(async(() => 
  {
    getSpy = spyOn(notesServiceMock, "get");
    selectedCategory = new Subject();
    newNoteId = new Subject();
    invalidCategoryId = new Subject();
    invalidNoteId = new Subject();
    storeMock = new StoreMock();
    storeMock.resultSelector = (selector) =>
    {
      if (selector == getInvalidCategoryId)
        return invalidCategoryId;
      if (selector == getInvalidNoteId)
        return invalidNoteId;
      if (selector == getSelectedCategory)
        return selectedCategory;
      return null;
    }

    TestBed.configureTestingModule({
      declarations: [ 
        NotePanelComponent, 
        FilterInputComponent, 
        NoteComponent, 
        WaitPanelComponent, 
        TranslatePipeMock 
      ],
      imports: [ 
        CKEditorModule, 
        FormsModule, 
        MatProgressSpinnerModule, 
        MatExpansionModule, 
        BrowserAnimationsModule 
      ],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: MessageDialogService, useValue: {} },
        { provide: LocalizationService, useValue: {} },
        { provide: MatDialog, useValue: { } },
        { provide: NotificationService, useValue: {} },
        { provide: NotesService, useValue: notesServiceMock },
        TranslatePipeMock
      ]
    }).compileComponents();
  }));

  beforeEach(() => 
  {
    fixture = TestBed.createComponent(NotePanelComponent);
    selectedCategory.next(new CategoryModel("1", "title1"));
    notes = [new NoteModel("1", "title1", "text1", "1"), new NoteModel("2", "title2", "text2", "1")]
    component = fixture.componentInstance;
    dialogSpy = spyOn<any>(component, "openEditDialog");
    fixture.detectChanges();
  });

  it('should create', () =>  expect(component).toBeTruthy());

  it('listens to note changes', () => expect(getSpy).toHaveBeenCalled());

  it('displays notes on notes changed', () => 
  {
    (component as any).handleNotesChanged(notes); 
    fixture.detectChanges();
    let noteElements: DebugElement[] = fixture.debugElement.queryAll(By.css("app-note"));
    expect(noteElements.length).toBe(2);
  });


  it('handleAddButtonClicked adds a new note', () => 
  {
    // component.handleAddButtonClicked();

    // expect(component.notes.source).toBe(1);
    // expect(component.filteredNotes[0].categoryId).toBe("1");
  });

  it('handleAddButtonClicked opens the new note in the edit dialog', () => 
  {
    component.handleAddButtonClicked();

    expect(dialogSpy).toHaveBeenCalled();
  });

  it('handleAddButtonClicked does not add a new note if invalid note or category exsits', () => 
  {
    // invalidCategoryId.next("1");
    // component.handleAddButtonClicked();
    // expect(component.filteredNotes.length).toBe(0);

    // invalidNoteId.next("1");
    // component.handleAddButtonClicked();
    // expect(component.filteredNotes.length).toBe(0);

    // invalidCategoryId.next(null);
    // component.handleAddButtonClicked();
    // expect(component.filteredNotes.length).toBe(0);
  });

  it('does remove the new note if the new note has changed to null', () => 
  {
    // component.handleAddButtonClicked();
    // newNoteId.next(null);

    // expect(component.filteredNotes.length).toBe(0);
  });
});