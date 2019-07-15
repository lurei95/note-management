import { Component, OnInit, Input } from '@angular/core';
import { NoteModel } from 'src/app/models/noteModel';
import { IApplicationState } from 'src/app/redux/reducers';
import { Store, Action } from '@ngrx/store';
import { NoteDeleteAction as NoteDeleteAction } from 'src/app/redux/actions/notes';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  private _note: NoteModel;
  @Input()
  set note(value: NoteModel) { this._note = value; }
  get note() {return this._note; }

  constructor(private store: Store<IApplicationState>) { }

  ngOnInit() { }

  onTextAreaValueChanged(value: string) { this.note.text = value; }

  onDeleteButtonClicked() { this.store.dispatch(new NoteDeleteAction(this.note)); }
}