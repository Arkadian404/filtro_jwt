import {Inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AdminConfirmationDialogComponent} from "./admin-confirmation-dialog/admin-confirmation-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialogRef:MatDialogRef<AdminConfirmationDialogComponent>,
              private dialog:MatDialog,
              @Inject(MAT_DIALOG_DATA) public data:any) { }

  confirmDialog():Observable<boolean>{
    return new Observable<boolean>(observer => {
      this.dialogRef = this.dialog.open(AdminConfirmationDialogComponent, {
        data: this.data
      })
      this.dialogRef.afterClosed().subscribe(dialogResult => {
        if(dialogResult){
          observer.next(dialogResult);
          observer.complete(); //to avoid memory leaks
        }
      });
    })
  }

}
