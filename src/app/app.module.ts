import { MessageDialogService } from './services/message-dialog.service';
import { SaveCategoryService } from 'src/app/services/category/save-category.service';
import { AddCategoryService } from 'src/app/services/category/add-category.service';
import { AddNoteService } from './services/note/add-note.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store'
import { SearchBoxComponent } from './components/filter-input/filter-input.component';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NotePanelComponent } from './components/note-panel/note-panel.component';
import { NoteComponent } from './components/note/note.component'
import { RetrieveNotesService } from './services/note/retrieve-notes.service';
import { FormsModule } from "@angular/forms";
import { CategoryComponent } from './components/category/category.component';
import { SaveNoteService } from './services/note/save-note.service';
import { DeleteNoteService } from './services/note/delete-note.service';
import { RetrieveCategoriesService } from './services/category/retrieve-categories.service';
import { DeleteCategoryService } from './services/category/delete-category.service';
import { MatInputModule } from '@angular/material/input';
import { MessageDialogComponent } from './components/dialogs/message-dialog/message-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { NoteDialogComponent } from './components/dialogs/note-dialog/note-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { NotificationListComponent } from './components/notification-list/notification-list.component';
import { NotificationService } from './services/notification/notificationService';
import { FilterNotesService } from './services/note/filter-notes.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { reducers } from './redux/state';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    SearchBoxComponent,
    HeaderBarComponent,
    SidebarComponent,
    NotePanelComponent,
    NoteComponent,
    CategoryComponent,
    MessageDialogComponent,
    NoteDialogComponent,
    DatePickerComponent,
    NotificationListComponent
  ],
  entryComponents: [
    MessageDialogComponent, 
    NoteDialogComponent
  ],
  imports: [
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
    MatInputModule,
    MatDialogModule,
    MatGridListModule,
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule 
{ }