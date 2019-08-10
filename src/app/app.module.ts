import { CategoriesService } from './services/category/categories.service';
import { UserObserver } from './services/authentication/userObserver';
import { ApplicationGuard } from './services/authentication/applicationGuard';
import { LoginGuard } from './services/authentication/loginGuard';
import { MessageDialogService } from './services/message-dialog.service';
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
import { NotesService } from './services/note/notes.service';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CategoryComponent } from './components/note-management/category/category.component';
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
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from "angularfire2/auth"
import { environment } from 'src/environments/environment';
import { RouterModule } from '@angular/router'
import { LoginComponent } from './components/authentication/login/login.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { rootRouterConfig } from './app.routes';
import { MatMenuModule } from '@angular/material/menu';
import { WaitPanelComponent } from './components/utiltity/wait-panel/wait-panel.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

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
  AngularFirestoreModule,
  AngularFireAuthModule,
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
  MatIconModule,
  StoreDevtoolsModule.instrument({ maxAge: 10 })
]

export var providers = [
  UserObserver,
  ApplicationGuard,
  LoginGuard,
  NotesService,
  CategoriesService,
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
  imports: [RouterModule.forRoot(rootRouterConfig), ...imports],
  providers: providers,
  bootstrap: [AppComponent]
})
export class AppModule 
{ }