import { ComboBoxComponent } from './components/combo-box/combo-box.component';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MessageDialogService } from './services/message-dialog.service';
import { FilterNotesService } from './services/note/filter-notes.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NotificationService } from './services/notification/notificationService';
import { SaveCategoryService } from './services/category/save-category.service';
import { AddCategoryService } from './services/category/add-category.service';
import { DeleteCategoryService } from './services/category/delete-category.service';
import { RetrieveCategoriesService } from './services/category/retrieve-categories.service';
import { DeleteNoteService } from './services/note/delete-note.service';
import { AddNoteService } from './services/note/add-note.service';
import { SaveNoteService } from './services/note/save-note.service';
import { RetrieveNotesService } from './services/note/retrieve-notes.service';
import { FilterInputComponent } from './components/filter-input/filter-input.component';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NotePanelComponent } from './components/note-panel/note-panel.component';
import { NoteComponent } from './components/note/note.component';
import { CategoryComponent } from './components/category/category.component';
import { MessageDialogComponent } from './components/dialogs/message-dialog/message-dialog.component';
import { NoteDialogComponent } from './components/dialogs/note-dialog/note-dialog.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { NotificationListComponent } from './components/notification-list/notification-list.component';
import { TagListComponent } from './components/tag-list/tag-list.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from './app.module';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { reducers } from './redux/state';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ComboBoxComponent,
        FilterInputComponent,
        HeaderBarComponent,
        SidebarComponent,
        NotePanelComponent,
        NoteComponent,
        CategoryComponent,
        MessageDialogComponent,
        NoteDialogComponent,
        DatePickerComponent,
        NotificationListComponent,
        TagListComponent
      ],
      imports: [
        MatSelectModule,
        MatExpansionModule,
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
        MatButtonModule,
        MatButtonToggleModule,
        BrowserModule,
        StoreModule.forRoot(reducers),
        FormsModule,
        BrowserAnimationsModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        CKEditorModule,
        MatChipsModule,
        MatIconModule,
      ],
      providers: [
        RetrieveNotesService,
        SaveNoteService,
        AddNoteService,
        DeleteNoteService,
        RetrieveCategoriesService,
        DeleteCategoryService,
        AddCategoryService,
        SaveCategoryService,
        NotificationService,
        MatDialog,
        HttpClientModule,
        FilterNotesService,
        MessageDialogService
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});