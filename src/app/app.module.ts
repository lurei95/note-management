import { AddCategoryService } from 'src/app/services/category/add-category.service';
import { AddNoteService } from './services/note/add-note.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store'
import { reducers } from './redux/reducers/index';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { HeaderBarItemComponent } from './components/header-bar-item/header-bar-item.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NotePanelComponent } from './components/note-panel/note-panel.component';
import { NoteComponent } from './components/note/note.component'
import { RetrieveNotesService } from './services/note/retrieve-notes.service';
import { FormsModule } from "@angular/forms";
import { CategoryComponent } from './components/category/category.component';
import { UpdateNoteService } from './services/note/update-note.service';
import { DeleteNoteService } from './services/note/delete-note.service';
import { RetrieveCategoriesService } from './services/category/retrieve-categories.service';
import { DeleteCategoryService } from './services/category/delete-category.service';
import { MatInputModule } from '@angular/material/input';
import { NoteDeleteDialogComponent } from './components/dialogs/note-delete-dialog/note-delete-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { NoteDialogComponent } from './components/dialogs/note-dialog/note-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePickerComponent } from './components/date-picker/date-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchBoxComponent,
    HeaderBarComponent,
    HeaderBarItemComponent,
    SidebarComponent,
    NotePanelComponent,
    NoteComponent,
    CategoryComponent,
    NoteDeleteDialogComponent,
    NoteDialogComponent,
    DatePickerComponent
  ],
  entryComponents: [NoteDeleteDialogComponent, NoteDialogComponent],
  imports: [
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
    MatNativeDateModule
  ],
  providers: [
    RetrieveNotesService,
    UpdateNoteService,
    AddNoteService,
    DeleteNoteService,
    RetrieveCategoriesService,
    DeleteCategoryService,
    AddCategoryService,
    MatDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
}