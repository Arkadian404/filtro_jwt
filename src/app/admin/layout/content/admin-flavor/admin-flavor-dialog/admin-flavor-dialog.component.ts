import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Flavor} from "../../../../../shared/models/product/flavor";
import {UtilService} from "../../../../../service/util.service";
import {FlavorService} from "../../../../../service/product/flavor.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-flavor-dialog',
  templateUrl: './admin-flavor-dialog.component.html',
  styleUrls: ['./admin-flavor-dialog.component.scss', '../../reusable/dialog.scss']
})
export class AdminFlavorDialogComponent implements OnInit{
  // @ts-ignore
  form:FormGroup<any>;

  constructor(private formBuilder:FormBuilder,
              private utilService:UtilService,
              private flavorService:FlavorService,
              private matDialog:MatDialogRef<AdminFlavorDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: [false, Validators.required]
    });
    if(this.data){
      this.form.patchValue(this.data);
      console.log(this.data);
    }
  }

  onSubmit(){
    if(this.form.valid){
      if(this.data){
          this.flavorService.updateFlavor(this.data.id, this.form.value).subscribe({
            next: (data) => {
              this.utilService.openSnackBar(data.message, 'Đóng')
              this.matDialog.close(true);
              console.log(this.form);
            },
            error: (err) => {
              this.utilService.openSnackBar(err, 'Đóng');
            }
          })
      }else{
        this.flavorService.createFlavor(this.form.value).subscribe({
          next:(data) => {
            this.utilService.openSnackBar(data.message, 'Đóng');
            this.matDialog.close(true);
            console.log(this.form)
          },
          error:(err) => {
            this.utilService.openSnackBar(err, 'Đóng');
          }
        })
      }
    }
  }

}
