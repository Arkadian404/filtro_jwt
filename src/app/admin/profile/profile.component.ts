import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {User} from "../../shared/models/user";
import {AuthenticationService} from "../../service/authentication.service";
// @ts-ignore
import * as data from "../../shared/utils/data.json";
import {Province} from "../../shared/models/province";
import {District} from "../../shared/models/district";
import {Ward} from "../../shared/models/ward";
import {distinctUntilChanged, tap} from "rxjs";
import {UserService} from "../../service/user.service";
import {UtilService} from "../../service/util.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  form:FormGroup;
  user: User;
  dataJson = data;
  provinces: Province[];
  districts: District[];
  wards: Ward[];

  constructor(private formBuilder:FormBuilder,
              private userService:UserService,
              private utilService: UtilService,
              private authService:AuthenticationService) {
  }

  ngOnInit(): void {
    this.getProvinces();
    this.form = this.formBuilder.group({
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      dob:'',
      phone: '',
      address: '',
      province: '',
      district: '',
      ward: '',
    })
    this.getUser();
     //this.form.patchValue(this.user);
  }



  getProvinces(){
    this.provinces = Object.values(<Province[]> this.dataJson).slice(0,63);
  }

  onProvinceChange(event:any){
    const province = event.source._value;
    console.log(province);
    this.districts = this.provinces.find( p=> p.name === province)?.districts || []
  }

  onDistrictChange(event:any){
    const district = event.source._value;
    console.log(district);
    this.wards = this.districts.find( d=> d.name === district)?.wards || []
  }

  onWardChange(event:any){
    const ward = event.source._value;
    console.log(ward);
  }

  getUser(){
    this.authService.currentUserAccess().pipe(
      tap(user=>{this.user = user}
      )).subscribe(
      {
        next:(data)=>{
          if(data){
            this.form.patchValue(data);
            this.form.get('username').disable();
            this.onProvinceChange({source:{_value:data.province}});
            this.onDistrictChange({source:{_value:data.district}});
            this.onWardChange({source:{_value:data.ward}});
          }

        },
        error:(err)=>{
          console.log(err)
        }
      }
    );
  }

  onSubmit(){
    if(this.form.valid){
      this.userService.updateUser(this.user.id, this.form.value).subscribe({
        next:(data)=>{
          this.utilService.openSnackBar('Cập nhật thành công', 'Đóng')
          console.log(data);
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
  }

}
