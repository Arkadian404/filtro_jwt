import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-conformation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss','../dialog.scss']
})
export class ConfirmationDialogComponent implements OnInit{

  constructor(public matDialogRef:MatDialogRef<ConfirmationDialogComponent>,
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
