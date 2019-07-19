import { DialogResult } from './../dialogs/dialogResult';
import { NoteDeleteDialogComponent } from '../dialogs/note-delete-dialog/note-delete-dialog.component';
import { UpdateNoteService } from '../../services/note/update-note.service';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NoteDisplayModel } from 'src/app/models/noteModel';
import { DeleteNoteService } from 'src/app/services/note/delete-note.service';
import { MatDialog } from '@angular/material/dialog';
import { nullOrEmpty } from 'src/app/util/utility';
import { EditableComponent } from '../editableComponent';
import { NoteDialogComponent } from '../dialogs/note-dialog/note-dialog.component';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent extends EditableComponent<NoteDisplayModel> implements OnInit
{
  @ViewChild("titleInput", {static: false}) titleInput: ElementRef;

  private isPointingOver: boolean;

  private _hasError: boolean;
  get hasError() { return this._hasError; }

  protected model: NoteDisplayModel;
  @Input()
  set note(value: NoteDisplayModel) 
  { 
    this.model = value; 
    if(this.model.isEditing && this.titleInput != null)
      this.titleInput.nativeElement.focus();
  }
  get note() { return this.model; }

  constructor(private updateService: UpdateNoteService,
    private deleteService: DeleteNoteService, 
    private dialog: MatDialog) 
  { super(); }

  ngOnInit() { }

  ngAfterViewInit() 
  {
    if(this.note.isEditing && this.titleInput != null)
      this.titleInput.nativeElement.focus();
  }

  openEditDialog() 
  {
    const dialogRef = this.dialog.open(NoteDialogComponent, {
      data: this.note
    });
  }

  onTextAreaValueChanged(value: string) { this.note.text = value; }

  onDeleteButtonClicked() 
  {
    const dialogRef = this.dialog.open(NoteDeleteDialogComponent, {
      data: this.note.title
    });

    dialogRef.afterClosed().subscribe(result => this.onDeleteDialogFinished(result));
  }

  onDeleteDialogFinished(result: string)
  {
    if(result == DialogResult.Confirm)
      this.deleteService.execute(this.note); 
  }

  onPointerEnter() { this.isPointingOver = true; }

  onPointerLeave() { this.isPointingOver = false; }

  onTitleChanged() { this._hasError = nullOrEmpty(this.note.title); }

  onFocusLeaving() 
  {
    if (this.isPointingOver)
      return;
      this.trySaveChanges();
  }

  handleSaveShortcut(e)
  {
    e.preventDefault();
    e.stopPropagation();
    this.trySaveChanges();
  }

  trySaveChanges()
  {
    if (!this.validateModel())
    {
      this._hasError = true;
      this.titleInput.nativeElement.focus();
      return;
    }
    
    this.model.isEditing = false;
    this.updateService.execute(this.note);
  }
}