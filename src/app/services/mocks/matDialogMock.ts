import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { TemplateRef } from '@angular/core';

/**
 * Mock service for {@link MatDialog}
 */
export class MatDialogMock extends MatDialog
{
  /**
   * Whether the dialog was opened
   */
  wasOpened: boolean = false;

  /**
   * Constructor
   */
  constructor() { super(null, null, null, null, null, null, null); }

  /**
   * Opens a modal dialog containing the given component.
   * @param componentOrTemplateRef Type of the component to load into the dialog,
   *     or a TemplateRef to instantiate as the dialog content.
   * @param config Extra configuration options.
   * @returns Reference to the newly-opened dialog.
   */
  open<T, D = any, R = any>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>, 
    config?: MatDialogConfig<D>): MatDialogRef<T, R>
  {
    this.wasOpened = true; 
    return null; 
  }
}