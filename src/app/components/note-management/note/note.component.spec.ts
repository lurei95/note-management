import { DialogResult } from 'src/app/components/utiltity/dialogResult';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogMock } from '../../../services/mocks/matDialogMock';
import { LocalizationServiceMock } from '../../../services/mocks/localizationServiceMock';
import { DeleteServiceMock } from '../../../services/mocks/deleteServiceMock';
import { ValidateNoteService } from '../../../services/note/validate-note.service';
import { MessageDialogService } from '../../../services/message-dialog.service';
import { LocalizationService } from '../../../services/localization.service';
import { getInvalidCategoryId, getInvalidNoteId } from 'src/app/redux/state';
import { StoreMock } from '../../../services/mocks/storeMock';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ValidationServiceMock } from 'src/app/services/mocks/validationServiceMock';
import { NoteModel } from 'src/app/models/notes/noteModel';
import { NoteComponent } from './note.component';
import { MessageDialogServiceMock } from 'src/app/services/mocks/messageDialogServiceMock';
import { DeleteNoteService } from 'src/app/services/note/delete-note.service';
import { SaveNoteService } from 'src/app/services/note/save-note.service';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MessageKind } from 'src/app/messageKind';
import { SaveServiceMock } from 'src/app/services/mocks/saveServiceMock';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('NoteComponent', () => {
  let component: NoteComponent;
  let fixture: ComponentFixture<NoteComponent>;
  let saveService: SaveServiceMock<NoteModel>;
  let validationService: ValidationServiceMock<NoteModel>
  let deleteService: DeleteServiceMock<NoteModel>;
  let localizationService: LocalizationServiceMock;
  let dialogMock: MatDialogMock;
  let dialogService: MessageDialogServiceMock;
  let note: NoteModel;
  let storeMock: StoreMock;
  let invalidCategoryId: Subject<string>;
  let invalidNoteId: Subject<string>;

  beforeEach(async(() => 
  {
    validationService = new ValidationServiceMock<NoteModel>();
    saveService = new  SaveServiceMock<NoteModel>();
    deleteService = new DeleteServiceMock<NoteModel>();
    localizationService = new LocalizationServiceMock();
    dialogMock = new MatDialogMock();
    dialogService = new MessageDialogServiceMock();
    invalidCategoryId = new Subject();
    invalidNoteId = new Subject();
    storeMock = new StoreMock();
    storeMock.resultSelector = (selector) => 
    {
      if (selector == getInvalidCategoryId)
        return invalidCategoryId;
      if (selector == getInvalidNoteId)
        return invalidNoteId;
      return null;  
    }

    TestBed.configureTestingModule({
      imports: [ CKEditorModule, FormsModule, MatExpansionModule, BrowserAnimationsModule ],
      declarations: [ NoteComponent ],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: MessageDialogService, useValue: dialogService },
        { provide: ValidateNoteService, useValue: validationService },
        { provide: LocalizationService, useValue: localizationService },
        { provide: SaveNoteService, useValue: saveService },
        { provide: MessageDialogService, useValue: dialogService },
        { provide: DeleteNoteService, useValue: deleteService },
        { provide: MatDialog, useValue: dialogMock },
      ],
    }).compileComponents();
  }));

  beforeEach(() => 
  {
    fixture = TestBed.createComponent(NoteComponent);
    component = fixture.componentInstance;
    note = new NoteModel("1", "title1", "text1", "1");
    component.model = note;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('openEditDialog opens the dialog if no invalid category or note exist', () => 
  {
    component.openEditDialog(new Event("test"));

    expect(dialogMock.wasOpened).toBe(true);
  });

  it('openEditDialog opens the dialog if no invalid note is current node', () => 
  {
    invalidNoteId.next("1");
    component.openEditDialog(new Event("test"));

    expect(dialogMock.wasOpened).toBe(true);
  });

  it('openEditDialog does not open the dialog if invalid category or note exist', () => 
  {
    invalidCategoryId.next("1");
    component.openEditDialog(new Event("test"));
    expect(dialogMock.wasOpened).toBe(false);

    invalidNoteId.next("2");
    component.openEditDialog(new Event("test"));
    expect(dialogMock.wasOpened).toBe(false);

    invalidCategoryId.next(null);
    component.openEditDialog(new Event("test"));
    expect(dialogMock.wasOpened).toBe(false);
  });

  it('handleDeleteButtonClicked opens a message dialog to ask the user if they really want to delete the note', () => 
  {
    localizationService.returnValue = "test";
    component.handleDeleteButtonClicked();

    expect(localizationService.names).toContain(MessageKind.DeleteNoteDialogText);
    expect(localizationService.names).toContain(MessageKind.DeleteNoteDialogTitle);
    expect(dialogService.text).toBe("test");
    expect(dialogService.title).toBe("test");
    expect(dialogService.buttons.length).toBe(2);
    expect(dialogService.buttons).toContain(DialogResult.Cancel);
    expect(dialogService.buttons).toContain(DialogResult.Delete);
  });

  it('does call delete service if delete dialog result is delete', () => 
  {
    (component as any).handleDeleteDialogFinished(DialogResult.Delete);

    expect(deleteService.parameter).toBe(note);
  });

  it('does not call delete service if delete dialog result is cancel', () => 
  {
    (component as any).handleDeleteDialogFinished(DialogResult.Cancel);

    expect(deleteService.parameter).toBeUndefined();
  });

  it("does save changes on focus leaving", () => 
  {
    let spy = spyOn<any>(component, "trySaveChanges");

    component.handleFocusLeaving();
 
    expect(spy).toHaveBeenCalled();
  });

  it("does not save changes on focus leaving when pointer still over component", () => 
  {
    component.handlePointerEnter();
    let spy = spyOn<any>(component, "trySaveChanges");

    component.handleFocusLeaving();
 
    expect(spy.calls.count()).toBe(0);
  });

  it("getRemainingTime returns null if dueDate is not set", () => 
  { expect(component.getRemainingTime()).toBeNull(); });

  it("getRemainingTime returns the right amount of days if dueDate is set", () => 
  { 
    let now = new Date();
    note.dueDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 6, now.getHours() + 1);
    let label = fixture.debugElement.query(By.css("#remainingTimeLabel")).nativeElement;
    fixture.detectChanges();

    expect(component.getRemainingTime()).toBe("6d");
    expect(label.innerHTML).toContain("6d");
  });

  it("getRemainingTime returns the right amount of weeks if dueDate is set", () => 
  { 
    let now = new Date();
    note.dueDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 16);
    let label = fixture.debugElement.query(By.css("#remainingTimeLabel")).nativeElement;
    fixture.detectChanges();

    expect(component.getRemainingTime()).toBe("2w");
    expect(label.innerHTML).toContain("2w");
  });

  it("getRemainingTime returns the right amount of months if dueDate is set", () => 
  { 
    let now = new Date();
    note.dueDate = new Date(now.getFullYear(), now.getMonth() + 4, now.getDay() + 16);
    let label = fixture.debugElement.query(By.css("#remainingTimeLabel")).nativeElement;
    fixture.detectChanges();

    expect(component.getRemainingTime()).toBe("4M");
    expect(label.innerHTML).toContain("4M");
  });

  it("getRemainingTime returns the right amount of months if dueDate is set", () => 
  { 
    let now = new Date();
    note.dueDate = new Date(now.getFullYear() + 3, now.getMonth() + 4, now.getDay() + 16);
    let label = fixture.debugElement.query(By.css("#remainingTimeLabel")).nativeElement;
    fixture.detectChanges();

    expect(component.getRemainingTime()).toBe("3y");
    expect(label.innerHTML).toContain("3y");
  });
});