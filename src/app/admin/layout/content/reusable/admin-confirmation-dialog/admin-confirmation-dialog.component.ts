import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-conformation-dialog',
  templateUrl: './admin-confirmation-dialog.component.html',
  styleUrls: ['./admin-confirmation-dialog.component.scss','../dialog.scss']
})
export class AdminConfirmationDialogComponent implements OnInit{

  constructor(public matDialogRef:MatDialogRef<AdminConfirmationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any) {}

  ngOnInit(): void {
  }

  confirm(){
    this.matDialogRef.close(true);
  }

  cancel(){
    this.matDialogRef.close(false);
  }

}
