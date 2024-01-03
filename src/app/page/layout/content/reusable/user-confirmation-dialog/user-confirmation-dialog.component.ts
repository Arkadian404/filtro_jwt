import {Component, Inject, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-user-confirmation-dialog',
  templateUrl: './user-confirmation-dialog.component.html',
  styleUrls: ['./user-confirmation-dialog.component.scss']
})
export class UserConfirmationDialogComponent {
  @Input() title: string;
  @Input() message: string;

  constructor(private matDialogRef: MatDialogRef<UserConfirmationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public  data: any) {
  }

  confirm() {
    this.matDialogRef.close(true);
  }

  cancel() {
    this.matDialogRef.close(false);
  }

}
