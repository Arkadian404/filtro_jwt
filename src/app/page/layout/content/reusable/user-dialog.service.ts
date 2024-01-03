import {Inject, Injectable} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UserConfirmationDialogComponent} from "./user-confirmation-dialog/user-confirmation-dialog.component";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserDialogService {
  constructor(private dialogRef:MatDialogRef<UserConfirmationDialogComponent>,
              private matDialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  confirmDialog(title:string, message:string):Observable<boolean>{
    return new Observable<boolean>(observer =>{
      const dialogRef =  this.dialogRef = this.matDialog.open(UserConfirmationDialogComponent, {
        data: this.data
      });
      const instance = dialogRef.componentInstance;
      instance.title = title;
      instance.message = message;
      this.dialogRef.afterClosed().subscribe(dialogResult =>{
        if(dialogResult){
          observer.next(dialogResult);
          observer.complete();
        }
      });
    });
  }
}
