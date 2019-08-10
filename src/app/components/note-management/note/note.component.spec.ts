import { DialogResult } from 'src/app/components/utiltity/dialogResult';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogMock } from '../../../services/mocks/matDialogMock';
import { MessageDialogService } from '../../../services/message-dialog.service';
import { LocalizationService } from '../../../services/localization.service';
import { getInvalidCategoryId, getInvalidNoteId } from 'src/app/redux/state';
import { StoreMock } from '../../../services/mocks/storeMock';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NoteModel } from 'src/app/models/notes/noteModel';
import { NoteComponent } from './note.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MessageKind } from 'src/app/messageKind';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { NotesService } from 'src/app/services/note/notes.service';
import { TranslatePipeMock } from 'src/app/services/mocks/translatePipeMock';

describe('NoteComponent', () => {
  let component: NoteComponent;
  let fixture: ComponentFixture<NoteComponent>;
  let dialogMock: MatDialogMock;
  let note: NoteModel;
  let storeMock: StoreMock;
  let invalidCategoryId: Subject<string>;
  let invalidNoteId: Subject<string>;
  let notesServiceMock: any = {
    validate() {},
    save() {},
    delete() {}
  };
  let deleteSpy: jasmine.Spy<any>;
  let localizationSpy: jasmine.Spy<any>;
  let messageDialogSpy: jasmine.Spy<any>;
  let localizationServiceMock = { execute(): any { } }
  let messageDialogService = { execute(): any { } }

  beforeEach(async(() => 
  {
    deleteSpy = spyOn(notesServiceMock, "delete");
    messageDialogSpy = spyOn(messageDialogService, "execute");
    localizationSpy = spyOn(localizationServiceMock, "execute").and.returnValue("test");
    dialogMock = new MatDialogMock();
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
      declarations: [ NoteComponent, TranslatePipeMock ],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: MessageDialogService, useValue: messageDialogService },
        { provide: LocalizationService, useValue: localizationServiceMock },
        { provide: MatDialog, useValue: dialogMock },
        { provide: NotesService, useValue: notesServiceMock },
        TranslatePipeMock
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

  it('handleDeleteButtonClicked shows the message dialog to ask the user if they really want to delete the note', () => 
  {
    component.handleDeleteButtonClicked();

    expect(localizationSpy.calls.all()[0].args[0]).toBe(MessageKind.DeleteNoteDialogText);
    expect(localizationSpy.calls.all()[1].args[0]).toBe(MessageKind.DeleteNoteDialogTitle);
    expect(messageDialogSpy.calls.first().args[0]).toBe("test");
    expect(messageDialogSpy.calls.first().args[1]).toBe("test");
    expect(messageDialogSpy.calls.first().args[2]).toContain(DialogResult.Delete);
    expect(messageDialogSpy.calls.first().args[2]).toContain(DialogResult.Cancel);
  });

  it('handleDeleteDialogFinished deletes the note on positive dialog result', () => 
  {
    (component as any).handleDeleteDialogFinished(DialogResult.Delete);
    expect(deleteSpy).toHaveBeenCalledWith(note);
  });

  it('handleDeleteDialogFinished does not delete the note on negative dialog result', () => 
  {
    (component as any).handleDeleteDialogFinished(DialogResult.Cancel);
    expect(deleteSpy.calls.count()).toBe(0);
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