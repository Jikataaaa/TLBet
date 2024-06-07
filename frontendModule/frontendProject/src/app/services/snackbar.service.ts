import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class SnackbarService {

  public duration: number = 5000;

  constructor(private _snackbar: MatSnackBar) { }

  openSuccess(message: string, action?: string) {
    this.openSnackBar(message, 'success', action);
  }

  openWarning(message: string, action?: string) {
    this.openSnackBar(message, 'warning', action);
  }

  openError(message: string, action?: string, serverErrorObj?: any) {
    const date = new Date();
    const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    let formattedMessage = message;

    if (serverErrorObj?.error) {
      formattedMessage += `\n ${serverErrorObj.error.uuid}:\n Описание: ${serverErrorObj.error.msg}`;
    }

    this.openSnackBar(formattedMessage as string, 'error', action, true);
  }

  private openSnackBar(message: string, className: 'error' | 'success' | 'warning', action?: string, usePreWrap: boolean = false) {
    const panelClass = usePreWrap ? [className, 'pre-wrap'] : [className];
    
    this._snackbar.open(message, action, {
      duration: this.duration,
      panelClass: panelClass
    });
  }
}
