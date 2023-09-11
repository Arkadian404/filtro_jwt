import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Flavor} from "../../../shared/models/flavor";
import {UtilService} from "../../../service/util.service";
import {FlavorService} from "../../../service/flavor.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-flavor-dialog',
  templateUrl: './flavor-dialog.component.html',
  styleUrls: ['./flavor-dialog.component.scss', '../../reusable/dialog.scss']
})
export class FlavorDialogComponent implements OnInit{
  // @ts-ignore
  form:FormGroup<any>;

  constructor(private formBuilder:FormBuilder,
              private utilService:UtilService,
              private flavorService:FlavorService,
              private matDialog:MatDialogRef<FlavorDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group<Flavor>({
      name: '',
      description: '',
      status: false
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
              this.utilService.openSnackBar('Cập nhật thành công', 'Đóng')
              this.matDialog.close(true);
              console.log(this.form);
            },
            error: (err) => {
              this.utilService.openSnackBar(err, 'Đóng');
            }
          })
      }else{
        this.flavorService.createFlavor(this.form.value).subscribe({
          next:() => {
            this.utilService.openSnackBar('Thêm thành công', 'Đóng');
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
