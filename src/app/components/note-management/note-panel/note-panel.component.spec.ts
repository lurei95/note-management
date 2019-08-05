import { WaitPanelComponent } from './../../utiltity/wait-panel/wait-panel.component';
import { SaveNoteService } from '../../../services/note/save-note.service';
import { MatDialog } from '@angular/material/dialog';
import { ValidateNoteService } from '../../../services/note/validate-note.service';
import { Store } from '@ngrx/store';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FilterInputComponent } from '../../utiltity/filter-input/filter-input.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NotePanelComponent } from './note-panel.component';
import { StoreMock } from 'src/app/services/mocks/storeMock';
import { Subject } from 'rxjs';
import { CategoryModel } from 'src/app/models/categories/categoryModel';
import { AddNoteServiceMock } from 'src/app/services/mocks/addNoteServiceMock';
import { FilterNotesServiceMock } from 'src/app/services/mocks/filterNotesServiceMock';
import { RetrieveCategoriesServiceMock } from 'src/app/services/mocks/retrieveCategoriesServiceMock';
import { RetrieveNotesServiceMock } from 'src/app/services/mocks/retrieveNotesServiceMock';
import { RetrieveCategoriesService } from 'src/app/services/category/retrieve-categories.service';
import { RetrieveNotesService } from 'src/app/services/note/retrieve-notes.service';
import { FilterNotesService } from 'src/app/services/note/filter-notes.service';
import { AddNoteService } from 'src/app/services/note/add-note.service';
import { getInvalidCategoryId, getInvalidNoteId, getNotes, getSelectedCatgeory } from 'src/app/redux/state';
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

describe('NotePanelComponent', () => 
{
  let component: NotePanelComponent;
  let fixture: ComponentFixture<NotePanelComponent>;
  let storeMock: StoreMock;
  let addService: AddNoteServiceMock;
  let filterService: FilterNotesServiceMock;
  let categoriesService: RetrieveCategoriesServiceMock;
  let notesService: RetrieveNotesServiceMock;
  let invalidCategoryId: Subject<string>;
  let invalidNoteId: Subject<string>;
  let notes: Subject<NoteModel[]>;
  let selectedCategory: Subject<CategoryModel>;

  beforeEach(async(() => 
  {
    notes = new Subject();
    selectedCategory = new Subject();
    invalidCategoryId = new Subject();
    invalidNoteId = new Subject();
    addService = new AddNoteServiceMock();
    filterService = new FilterNotesServiceMock();
    notesService = new RetrieveNotesServiceMock();
    categoriesService = new RetrieveCategoriesServiceMock();
    storeMock = new StoreMock();
    storeMock.resultSelector = (selector) =>
    {
      if (selector == getInvalidCategoryId)
        return invalidCategoryId;
      if (selector == getInvalidNoteId)
        return invalidNoteId;
      if (selector == getNotes)
        return notes;
      if (selector == getSelectedCatgeory)
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
        { provide: RetrieveCategoriesService, useValue: categoriesService },
        { provide: RetrieveNotesService, useValue: notesService },
        { provide: FilterNotesService, useValue: filterService },
        { provide: AddNoteService, useValue: addService },
        { provide: Store, useValue: storeMock },
        { provide: MessageDialogService, useValue: {} },
        { provide: LocalizationService, useValue: {} },
        { provide: ValidateNoteService, useValue: {} },
        { provide: MatDialog, useValue: {} },
        { provide: SaveNoteService, useValue: {} },
        { provide: NotificationService, useValue: {} }
      ]
    }).compileComponents();
  }));

  beforeEach(() => 
  {
    fixture = TestBed.createComponent(NotePanelComponent);
    selectedCategory.next(new CategoryModel("1", "title1"));
    notes.next([new NoteModel("1", "title1", "text1", "1"), new NoteModel("2", "title2", "text2", "1")])
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () =>  expect(component).toBeTruthy());

  it('displays notes on notes changed', () => 
  {
    let noteElements: DebugElement[] = fixture.debugElement.queryAll(By.css("app-note"));
    expect(noteElements.length).toBe(2);
  });

  it('handleAddButtonClicked calls the add service if no invalid category or note exist', () => 
  {
    component.handleAddButtonClicked();

    expect(addService.wasCalled).toBe(true);
  });

  it('handleAddButtonClicked does not call the add service if invalid category or note exist', () => 
  {
    invalidCategoryId.next("1");
    component.handleAddButtonClicked();
    expect(addService.wasCalled).toBe(false);

    invalidNoteId.next("1");
    component.handleAddButtonClicked();
    expect(addService.wasCalled).toBe(false);

    invalidCategoryId.next(null);
    component.handleAddButtonClicked();
    expect(addService.wasCalled).toBe(false);
  });

  it('handleFilterTextChanged does call the filter service', () => 
  {
    component.handleFilterTextChanged("filterText");

    expect(filterService.filterText).toBe("filterText");
    expect(filterService.categoryId).toBe("1")
    expect(filterService.notes.length).toBe(2);
  });

  it('changing the selcted category calls the filter service', () => 
  {
    selectedCategory.next(new CategoryModel("2", "title2"));

    expect(component.title).toBe("title2");
    expect(filterService.categoryId).toBe("2")
    expect(filterService.notes.length).toBe(2);
  });
});