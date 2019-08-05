import { StoreMock } from './../../services/mocks/storeMock';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CategoryComponent } from './../note-management/category/category.component';
import { FormsModule } from '@angular/forms';
import { FilterInputComponent } from './../utiltity/filter-input/filter-input.component';
import { WaitPanelComponent } from './../utiltity/wait-panel/wait-panel.component';
import { NoteComponent } from './../note-management/note/note.component';
import { SidebarComponent } from './../note-management/sidebar/sidebar.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MainPageComponent } from './main-page.component';
import { HeaderBarComponent } from '../header-bar/header-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { NotePanelComponent } from '../note-management/note-panel/note-panel.component';
import { NotificationListComponent } from '../utiltity/notification-list/notification-list.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { Store } from '@ngrx/store';
import { ValidateNoteService } from 'src/app/services/note/validate-note.service';
import { LocalizationService } from 'src/app/services/localization.service';
import { SaveCategoryService } from 'src/app/services/category/save-category.service';
import { MessageDialogService } from 'src/app/services/message-dialog.service';
import { DeleteCategoryService } from 'src/app/services/category/delete-category.service';
import { SaveNoteService } from 'src/app/services/note/save-note.service';
import { DeleteNoteService } from 'src/app/services/note/delete-note.service';
import { MatDialog } from '@angular/material/dialog';

describe('MainPageComponent', () => 
{
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  let store: StoreMock;

  beforeEach(async(() => 
  {
    store = new StoreMock();
    TestBed.configureTestingModule(
    {
      declarations: [ 
        HeaderBarComponent, 
        MainPageComponent, 
        SidebarComponent, 
        NotePanelComponent, 
        WaitPanelComponent,
        NotificationListComponent,
        FilterInputComponent,
        CategoryComponent,
        NoteComponent
      ],
      imports: [ 
        MatMenuModule, 
        MatToolbarModule, 
        FormsModule, 
        MatProgressSpinnerModule, 
        MatExpansionModule,
        CKEditorModule
      ],
      providers: [
        { provide: AuthenticationService, useValue: {}},
        { provide: Store, useValue: store},
        { provide: ValidateNoteService, useValue: {}},
        { provide: LocalizationService, useValue: {}},
        { provide: SaveCategoryService, useValue: {}},
        { provide: MessageDialogService, useValue: {}},
        { provide: DeleteCategoryService, useValue: {}},
        { provide: MessageDialogService, useValue: {}},
        { provide: SaveNoteService, useValue: {}},
        { provide: DeleteNoteService, useValue: {}},
        { provide: MatDialog, useValue: {}},
      ]
    }).compileComponents();
  }));

  beforeEach(() => 
  {
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());
});