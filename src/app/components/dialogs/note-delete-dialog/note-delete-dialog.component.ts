import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-note-delete-dialog',
  templateUrl: './note-delete-dialog.component.html',
})
export class NoteDeleteDialogComponent implements OnInit 
{
  private _title: string;
  get title() { return this._title; }

  constructor(@Inject(MAT_DIALOG_DATA) data: string) 
  { this._title = data; }

  ngOnInit()  { }
}