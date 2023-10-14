import {Component, ElementRef, Inject, OnInit, Renderer2} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UtilService} from "../../../../../service/util.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Category} from "../../../../../shared/models/product/category";
import {UserService} from "../../../../../service/user.service";
import {User} from "../../../../../shared/models/user";
// @ts-ignore
import * as data from "../../../../../shared/utils/data.json"
import {Province} from "../../../../../shared/models/province";
import {District} from "../../../../../shared/models/district";
import {Ward} from "../../../../../shared/models/ward";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-user-dialog',
  templateUrl: './admin-user-dialog.component.html',
  styleUrls: ['./admin-user-dialog.component.scss', '../../reusable/dialog.scss']
})
export class AdminUserDialogComponent implements OnInit{
  // @ts-ignore
  form:FormGroup<any>;
  provinces: Province[];
  districts: District[];
  wards: Ward[];
  selectedDistrict: District | undefined;
  selectedWard: Ward | undefined;
  constructor(private formBuilder:FormBuilder,
              private userService:UserService,
              private utilService:UtilService,
              private matDialog:MatDialogRef<AdminUserDialogComponent>,
              private ref:ElementRef,
              private render:Renderer2,
              @Inject(MAT_DIALOG_DATA) public data:any) {
  }

  ngOnInit() {
    this.getProvinces();
    this.form = this.formBuilder.group<User>({
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      dob: new Date(),
      address: '',
      province: '',
      district: '',
      ward: '',
      phone: '',
      enabled: false
    });
    if(this.data){
      const passwordField = this.ref.nativeElement.querySelector('#password');
      this.render.addClass(passwordField, 'hide-password')
      this.form.get('username')?.disable();
      this.form.get('email')?.disable();
      this.form.patchValue(this.data);
      this.onProvinceChange({source:{_value:this.data.province}})
      this.onDistrictChange({source:{_value:this.data.district}})
      this.onWardChange({source:{_value:this.data.ward}})

      console.log(this.data);
    }

  }

  getProvinces(){
    this.provinces = Object.values(<Province[]> data).slice(0,63);
  }

  onSubmit(){
    if(this.form.valid){
      if(this.data){
        this.userService.updateUser(this.data.id, this.form.value).subscribe({
          next:(data)=>{
            this.utilService.openSnackBar(data.message, 'Đóng')
            this.matDialog.close(true);
            console.log(this.form);
          },
          error:(err)=>{
            this.utilService.openSnackBar(err, 'Đóng');
          }
        })
      }else{
        this.userService.createUser(this.form.value).subscribe({
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

  onProvinceChange(event:any){
    const province = event.source._value;
    console.log(province);
    this.districts = this.provinces.find( p=> p.name === province).districts || []
  }

  onDistrictChange(event:any){
    this.selectedDistrict = event.source._value;
    const district = event.source._value;
    console.log(district);
    this.wards = this.districts.find( d=> d.name === district).wards || []
  }

  onWardChange(event:any){
    this.selectedWard = event.source._value;
    const ward = event.source._value;
    console.log(ward);

  }

}
