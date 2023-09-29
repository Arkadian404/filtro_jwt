import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UtilService} from "../../../../../service/util.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {VendorService} from "../../../../../service/vendor.service";
import {Vendor} from "../../../../../shared/models/vendor";

@Component({
  selector: 'app-admin-vendor-dialog',
  templateUrl: './admin-vendor-dialog.component.html',
  styleUrls: ['./admin-vendor-dialog.component.scss', '../../reusable/dialog.scss']
})
export class AdminVendorDialogComponent {
  form:FormGroup<any>;
  constructor(private formBuilder:FormBuilder,
              private vendorService:VendorService,
              private utilService:UtilService,
              private matDialog:MatDialogRef<AdminVendorDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group<Vendor>({
      name: '',
      email: '',
      phone: '',
      address: '',
      description: ''
    });
    if(this.data){
      this.form.patchValue(this.data);
      console.log(this.data);
    }
  }

  onSubmit(){
    if(this.form.valid){
      if(this.data){
        this.vendorService.update(this.data.id, this.form.value).subscribe({
          next:(data)=>{
            this.utilService.openSnackBar('Cập nhật thành công', 'Đóng')
            this.matDialog.close(true);
            console.log(this.form);
          },
          error:(err)=>{
            this.utilService.openSnackBar(err, 'Đóng');
          }
        })
      }else{
        this.vendorService.create(this.form.value).subscribe({
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