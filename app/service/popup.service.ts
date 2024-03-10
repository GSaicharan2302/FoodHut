import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(
    private snackBar:MatSnackBar
  ) { }

  openSnackBar(msg:string,click?:string){
    if(!click || click==''){
      click='OK'
    }

    this.snackBar.open(msg, click, {
      duration: 2000,
      panelClass: ['mat-toolbar', 'mat-primary']
    })
  }
  
}
