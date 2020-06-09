import { CategoriesService } from './../../services/category/categories.service';
import { AngularFirestore } from '@angular/fire/firestore';
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
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { NotePanelComponent } from '../note-management/note-panel/note-panel.component';
import { NotificationListComponent } from '../utiltity/notification-list/notification-list.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { Store } from '@ngrx/store';
import { LocalizationService } from '../../services/localization.service';
import { MessageDialogService } from '../../services/message-dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../../services/notification/notificationService';
import { NotesService } from '../../services/note/notes.service';
import { TranslatePipeMock } from '../../services/mocks/translatePipeMock';

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
        NoteComponent,
        TranslatePipeMock
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
        { provide: LocalizationService, useValue: {}},
        { provide: MessageDialogService, useValue: {}},
        { provide: NotificationService, useValue: {}},
        { provide: MatDialog, useValue: {}},
        { provide: AngularFirestore, useValue: {}},
        { provide: CategoriesService, useValue: { get() {} }},
        { provide: NotesService, useValue: { get() {} }},
        TranslatePipeMock
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