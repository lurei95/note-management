import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store'
import { reducers } from './redux/reducers/index';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { HeaderBarItemComponent } from './components/header-bar-item/header-bar-item.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NotePanelComponent } from './components/note-panel/note-panel.component';
import { NoteComponent } from './components/note/note.component'
import { RetrieveNotesService } from './services/retrieve-notes.service';
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    SearchBoxComponent,
    HeaderBarComponent,
    HeaderBarItemComponent,
    SidebarComponent,
    NotePanelComponent,
    NoteComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers),
    FormsModule
  ],
  providers: [RetrieveNotesService],
  bootstrap: [AppComponent]
})
export class AppModule { 
}