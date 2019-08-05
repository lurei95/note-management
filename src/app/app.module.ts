import { UserObserver } from './services/authentication/userObserver';
import { ApplicationGuard } from './services/authentication/applicationGuard';
import { LoginGuard } from './services/authentication/loginGuard';
import { MessageDialogService } from './services/message-dialog.service';
import { SaveCategoryService } from 'src/app/services/category/save-category.service';
import { AddCategoryService } from 'src/app/services/category/add-category.service';
import { AddNoteService } from './services/note/add-note.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FilterInputComponent } from './components/utiltity/filter-input/filter-input.component';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { SidebarComponent } from './components/note-management/sidebar/sidebar.component';
import { NotePanelComponent } from './components/note-management/note-panel/note-panel.component';
import { NoteComponent } from './components/note-management/note/note.component'
import { RetrieveNotesService } from './services/note/retrieve-notes.service';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CategoryComponent } from './components/note-management/category/category.component';
import { SaveNoteService } from './services/note/save-note.service';
import { DeleteNoteService } from './services/note/delete-note.service';
import { RetrieveCategoriesService } from './services/category/retrieve-categories.service';
import { DeleteCategoryService } from './services/category/delete-category.service';
import { MessageDialogComponent } from './components/utiltity/message-dialog/message-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NoteDialogComponent } from './components/note-management/note-dialog/note-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePickerComponent } from './components/utiltity/date-picker/date-picker.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { NotificationListComponent } from './components/utiltity/notification-list/notification-list.component';
import { NotificationService } from './services/notification/notificationService';
import { FilterNotesService } from './services/note/filter-notes.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { reducers } from './redux/state';
import { TagListComponent } from './components/utiltity/tag-list/tag-list.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { ComboBoxComponent } from './components/utiltity/combo-box/combo-box.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AngularFireModule } from "angularfire2"
import { AngularFireDatabaseModule } from "angularfire2/database"
import { AngularFireAuthModule } from "angularfire2/auth"
import { environment } from 'src/environments/environment';
import { RouterModule } from '@angular/router'
import { LoginComponent } from './components/authentication/login/login.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { rootRouterConfig } from './app.routes';
import { MatMenuModule } from '@angular/material/menu';
import { WaitPanelComponent } from './components/utiltity/wait-panel/wait-panel.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

export var declarations = [
  LoginComponent,
  MainPageComponent,
  RegisterComponent,
  AppComponent,
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
  TagListComponent,
  ComboBoxComponent,
  MainPageComponent,
  RegisterComponent,
  WaitPanelComponent
]

export var imports = [
  AngularFireModule.initializeApp(environment.firebase),
  AngularFireDatabaseModule,
  AngularFireAuthModule,
  RouterModule.forRoot(rootRouterConfig),
  ReactiveFormsModule,
  MatToolbarModule,
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
  MatMenuModule,
  StoreModule.forRoot(reducers),
  FormsModule,
  MatProgressSpinnerModule,
  BrowserAnimationsModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  CKEditorModule,
  MatChipsModule,
  MatIconModule
]

export var providers = [
  UserObserver,
  ApplicationGuard,
  LoginGuard,
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

@NgModule({
  declarations: declarations,
  entryComponents: [
    MessageDialogComponent, 
    NoteDialogComponent
  ],
  imports: imports,
  providers: providers,
  bootstrap: [AppComponent]
})
export class AppModule 
{ }