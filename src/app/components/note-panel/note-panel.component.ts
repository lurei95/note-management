import { getNotes, getSearchText } from './../../redux/reducers/index';
import { NoteModel } from '../../models/noteModel';
import { Component, OnInit } from '@angular/core';
import { RetrieveNotesService } from 'src/app/services/retrieve-notes.service';
import { IApplicationState } from 'src/app/redux/reducers';
import { Store } from '@ngrx/store';
import { NoteAddAction } from 'src/app/redux/actions/notes';

@Component({
  selector: 'app-note-panel',
  templateUrl: './note-panel.component.html',
  styleUrls: ['./note-panel.component.css']
})
export class NotePanelComponent implements OnInit 
{
  private filteredNotes: NoteModel[];
  private notes: NoteModel[];
  private searchText: string;

  constructor(private service : RetrieveNotesService, private store : Store<IApplicationState>) {
    service.retrieveNotes();

    store.select(state => getSearchText("Note", state)).subscribe((x: string) => this.handleSearchTextChanged(x));
    store.select(getNotes).subscribe((x: NoteModel[]) => this.handleNotesChanged(x));
  }

  private handleNotesChanged(notes: NoteModel[]) {
    this.notes = notes;
    this.filterNotes(notes); 
  }

  private handleSearchTextChanged(searchText: string) {
    console.log("handle searchTextChanged");
    this.searchText = searchText;
    this.filterNotes(this.notes); 
  }

  private filterNotes(notes: NoteModel[]) {
    if (this.searchText != null)
      this.filteredNotes = notes.filter(
        note => note.title.toUpperCase().includes(this.searchText.toUpperCase())
      );
    else
      this.filteredNotes = notes
  }

  ngOnInit() { }

  onAddButtonClicked() { this.store.dispatch(new NoteAddAction(new NoteModel())); }
}