import { WaitPanelComponent } from './../../utiltity/wait-panel/wait-panel.component';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FilterInputComponent } from '../../utiltity/filter-input/filter-input.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NotePanelComponent } from './note-panel.component';
import { StoreMock } from 'src/app/services/mocks/storeMock';
import { Subject } from 'rxjs';
import { CategoryModel } from 'src/app/models/categories/categoryModel';
import { FilterNotesServiceMock } from 'src/app/services/mocks/filterNotesServiceMock';
import { NotesService } from 'src/app/services/note/notes.service';
import { FilterNotesService } from 'src/app/services/note/filter-notes.service';
import { getInvalidCategoryId, getInvalidNoteId, getSelectedCategory } from 'src/app/redux/state';
import { NoteComponent } from '../note/note.component';
import { FormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoteModel } from 'src/app/models/notes/noteModel';
import { MessageDialogService } from 'src/app/services/message-dialog.service';
import { LocalizationService } from 'src/app/services/localization.service';
import { NotificationService } from 'src/app/services/notification/notificationService';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoteDialogComponent } from '../../dialogs/note-dialog/note-dialog.component';

describe('NotePanelComponent', () => 
{
  let component: NotePanelComponent;
  let fixture: ComponentFixture<NotePanelComponent>;
  let storeMock: StoreMock;
  let notesServiceMock: any = { get() {} };
  let filterService: FilterNotesServiceMock;
  let invalidCategoryId: Subject<string>;
  let invalidNoteId: Subject<string>;
  let selectedCategory: Subject<CategoryModel>;
  let notes: NoteModel[];
  let getSpy: jasmine.Spy<any>;
  let dialogSpy: jasmine.Spy<any>;

  beforeEach(async(() => 
  {
    getSpy = spyOn(notesServiceMock, "get");
    selectedCategory = new Subject();
    invalidCategoryId = new Subject();
    invalidNoteId = new Subject();
    filterService = new FilterNotesServiceMock();
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
      declarations: [ NotePanelComponent, FilterInputComponent, NoteComponent, WaitPanelComponent ],
      imports: [ 
        CKEditorModule, 
        FormsModule, 
        MatProgressSpinnerModule, 
        MatExpansionModule, 
        BrowserAnimationsModule 
      ],
      providers: [
        { provide: FilterNotesService, useValue: filterService },
        { provide: Store, useValue: storeMock },
        { provide: MessageDialogService, useValue: {} },
        { provide: LocalizationService, useValue: {} },
        { provide: MatDialog, useValue: { } },
        { provide: NotificationService, useValue: {} },
        { provide: NotesService, useValue: notesServiceMock }
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

  it('handleFilterTextChanged does call the filter service', () => 
  {
    (component as any).notes = notes;
    component.handleFilterTextChanged("filterText");

    expect(filterService.filterText).toBe("filterText");
    expect(filterService.categoryId).toBe("1")
    expect(filterService.notes).toBe(notes);
  });

  it('changing the selcted category calls the filter service', () => 
  {
    (component as any).notes = notes;
    selectedCategory.next(new CategoryModel("2", "title2"));

    expect(component.title).toBe("title2");
    expect(filterService.categoryId).toBe("2")
    expect(filterService.notes).toBe(notes);
  });

  it('handleAddButtonClicked adds a new note', () => 
  {
    component.handleAddButtonClicked();

    expect(component.filteredNotes.length).toBe(1);
    expect(component.filteredNotes[0].categoryId).toBe("1");
  });

  it('handleAddButtonClicked opens the new note in the edit dialog', () => 
  {
    component.handleAddButtonClicked();

    expect(dialogSpy).toHaveBeenCalled();
  });

  it('handleAddButtonClicked does not add a new note if invalid note or category exsits', () => 
  {
    invalidCategoryId.next("1");
    component.handleAddButtonClicked();
    expect(component.filteredNotes.length).toBe(0);

    invalidNoteId.next("1");
    component.handleAddButtonClicked();
    expect(component.filteredNotes.length).toBe(0);

    invalidCategoryId.next(null);
    component.handleAddButtonClicked();
    expect(component.filteredNotes.length).toBe(0);
  });
});