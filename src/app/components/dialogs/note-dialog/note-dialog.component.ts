import { NoteDisplayModel } from 'src/app/models/noteModel';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-note-dialog',
  templateUrl: './note-dialog.component.html',
  styleUrls: ['./note-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NoteDialogComponent implements OnInit 
{
  private _isExpanded: boolean;
  get isExpanded() { return this._isExpanded; }

  private _hasError: boolean;
  get hasError() { return this._hasError; }

  private _note: NoteDisplayModel;
  get note() { return this._note; }
  
  constructor(@Inject(MAT_DIALOG_DATA) data: NoteDisplayModel, private dialog: MatDialogRef<NoteDialogComponent>) 
  { this._note = data; }

  ngOnInit()  { }

  onExpandButtonClicked() { this._isExpanded = !this._isExpanded; }

  onCloseButtonClicked() { this.dialog.close(); }

  onTitleChanged() {}

  onTextAreaValueChanged(value: string) { this.note.text = value; }
}