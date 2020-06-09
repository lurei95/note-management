import { LocalizationService } from '../../../services/localization.service';
import { LocalizationServiceMock } from '../../../services/mocks/localizationServiceMock';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { async } from 'q';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MessageDialogComponent } from './message-dialog.component';
import { DialogInformation } from '../dialogInformation';
import { DialogResult } from '../dialogResult';
import { By } from '@angular/platform-browser';

describe('MessageDialogComponent', () =>
{
  let component: MessageDialogComponent;
  let fixture: ComponentFixture<MessageDialogComponent>;
  let localizationService = new LocalizationServiceMock();
  let dialogInfo = new DialogInformation("testText", "testTitle", 
    [DialogResult.No, DialogResult.Yes, DialogResult.Cancel]);

  beforeEach(async(() => 
  {
    TestBed.configureTestingModule({ 
      declarations: [ MessageDialogComponent ],
      imports: [ MatDialogModule ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: dialogInfo },
        { provide: MatDialogRef, useValue: {} },
        { provide: LocalizationService, useValue: localizationService }
      ]
    }).compileComponents(); 
  }));

  beforeEach(() => 
  {
    localizationService.returnValue = "test";
    fixture = TestBed.createComponent(MessageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => expect(component).toBeTruthy());

  xit('the dialog should have the correct buttons', () => 
  {
    let buttons = fixture.debugElement.queryAll(By.css("button"));
    expect(buttons.length).toBe(3);
    expect(buttons[0].nativeElement.innerHTML).toContain("test");
    expect(buttons[1].nativeElement.innerHTML).toContain("test");
    expect(buttons[2].nativeElement.innerHTML).toContain("test");
  });

  xit('the dialog should have the correct text and title', () => 
  {
    let title = fixture.debugElement.query(By.css("h2")).nativeElement;
    expect(title.innerHTML).toContain("testTitle");
    let text = fixture.debugElement.query(By.css("p")).nativeElement;
    expect(text.innerHTML).toContain("testText");
  });
});