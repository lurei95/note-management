import { WaitPanelComponent } from './../../utiltity/wait-panel/wait-panel.component';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
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
  let notesSubject: Subject<NoteModel[]>;
  let filterFunc: any;
  let getSpy: jasmine.Spy<any>;
  let dialogSpy: jasmine.Spy<any>;

  beforeEach(async(() => 
  {
    let note1: NoteModel = new NoteModel("1", "title1");
    let note2: NoteModel = new NoteModel("2", "title2");
    notes = [ note1, note2 ]
    notesSubject = new Subject<NoteModel[]>();
    getSpy = spyOn(notesServiceMock, "get").and.callFake((func: any) => 
    {
      filterFunc = func;
      return notesSubject;
    });
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

  it('listens to note changes', () => 
  {
    expect(getSpy).toHaveBeenCalled();
    expect(filterFunc).toBeTruthy();
  });

  it('initializes notes correctly', () => 
  {
    expect((component as any)._notes).toBe(notesSubject);
  });

  it('handleAddButtonClicked adds a new note', () => 
  {
    component.handleAddButtonClicked();
    expect(dialogSpy).toHaveBeenCalled();
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
    expect(dialogSpy).not.toHaveBeenCalled();

    invalidNoteId.next("1");
    component.handleAddButtonClicked();
    expect(dialogSpy).not.toHaveBeenCalled();

    invalidCategoryId.next(null);
    component.handleAddButtonClicked();
    expect(dialogSpy).not.toHaveBeenCalled();
  });
});