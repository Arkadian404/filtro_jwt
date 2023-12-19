import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../../shared/models/user";

// @ts-ignore
import * as data from "../../../../shared/utils/data.json";
import {Province} from "../../../../shared/models/province";
import {District} from "../../../../shared/models/district";
import {Ward} from "../../../../shared/models/ward";
import {UserService} from "../../../../service/user/user.service";
import {UtilService} from "../../../../service/util.service";
import {AuthenticationService} from "../../../../service/user/authentication.service";
import {validatePassword} from "../../../../shared/validators/validate-password.validator";
import {tap} from "rxjs";

const PASSWORD_PATTERN = /^(?=.*[!@#$%^&*]+)[a-zA-Z0-9!@#$%^&*]/;
const PHONE_PATTERN = /^\d{10,11}$|^0\d{9,10}$/;
const NAME_PATTERN = /^[a-zA-Z]+$/;

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit{
  profileForm: FormGroup;
  passwordForm: FormGroup;
  user: User;
  dataJson = data;
  provinces: Province[];
  districts: District[];
  wards: Ward[];
  passwordType = true;
  hours = new Date().getHours();

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private utilService: UtilService) {
  }

  ngOnInit(): void {
    this.getProvinces();
    this.profileForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.pattern(NAME_PATTERN)]],
      lastname: ['', [Validators.required, Validators.pattern(NAME_PATTERN)]],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(PHONE_PATTERN)]],
      address: ['', Validators.required],
      province: ['', Validators.required],
      district: ['', Validators.required],
      ward: ['', Validators.required],
    })
    this.passwordForm = this.formBuilder.group({
        oldPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.pattern(PASSWORD_PATTERN)]],
        confirmPassword: ['', Validators.required]
      },
      {validators: validatePassword('newPassword', 'confirmPassword')}
    )
    this.getUser();
  }


  getProvinces() {
    this.provinces = Object.values(<Province[]>this.dataJson).slice(0, 63);
  }

  onProvinceChange(event: any) {
    const province = event.source._value;
    console.log(province);
    this.districts = this.provinces.find(p => p.name === province)?.districts || []
  }

  onDistrictChange(event: any) {
    const district = event.source._value;
    console.log(district);
    this.wards = this.districts.find(d => d.name === district)?.wards || []
  }

  onWardChange(event: any) {
    const ward = event.source._value;
    console.log(ward);
  }

  getUser() {
    this.userService.currentUser().pipe(
      tap(user => {
          this.user = user
        }
      )).subscribe(
      {
        next: (data) => {
          if (data) {
            this.profileForm.patchValue(data);
            this.profileForm.get('username').disable();
            this.onProvinceChange({source: {_value: data.province}});
            this.onDistrictChange({source: {_value: data.district}});
            this.onWardChange({source: {_value: data.ward}});
          }
        },
        error: (err) => {
          console.log(err)
        }
      }
    );
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const convertDate = new Date(this.profileForm.value.dob).toISOString();
      this.profileForm.value.dob = convertDate.slice(0,10);
      this.userService.updateUserInfo(this.user.id, this.profileForm.value).subscribe({
        next: (data) => {
          this.utilService.openSnackBar('Cập nhật thành công', 'Đóng')
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }


  onSubmitPassword() {
    if (this.passwordForm.valid) {
      console.log(this.passwordForm.value);
      console.log(this.user.id);
      console.log(this.passwordForm.value.oldPassword);
      console.log(this.passwordForm.value.newPassword);
      this.userService.changeUserPassword(this.user.id,
        this.passwordForm.value.oldPassword,
        this.passwordForm.value.newPassword)
        .subscribe({
          next: (data) => {
            this.utilService.openSnackBar('Cập nhật thành công', 'Đóng')
            console.log(data);
            this.passwordForm.reset();
            this.passwordForm.markAsPristine();
          },
          error: (err) => {
            this.utilService.openSnackBar(err, 'Đóng');
            console.log(err);
          }
        })
    }
  }
}
