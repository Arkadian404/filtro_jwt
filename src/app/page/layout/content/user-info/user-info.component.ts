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
import {filter, of, startWith, switchMap, tap} from "rxjs";
import {GhnService} from "../../../../service/ghn.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {GhnProvince} from "../../../../shared/models/ghn/ghn-province";
import {GhnDistrict} from "../../../../shared/models/ghn/ghn-district";
import {GhnWard} from "../../../../shared/models/ghn/ghn-ward";
import {MatSelectChange} from "@angular/material/select";

const PASSWORD_PATTERN = /^(?=.*[!@#$%^&*]+)[a-zA-Z0-9!@#$%^&*]/;
const PHONE_PATTERN = /^\d{10,11}$|^0\d{9,10}$/;
const NAME_PATTERN = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s|_]+$/;

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit{
  _province: GhnProvince[] = [];
  _district: GhnDistrict[] = [];
  _ward: GhnWard[] = [];
  profileForm: FormGroup;
  passwordForm: FormGroup;
  user: User;
  dataJson = data;
  provinces: Province[];
  districts: District[];
  wards: Ward[];
  passwordType = true;
  hours = new Date().getHours();
  isLoading = false;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private ghnService: GhnService,
              private utilService: UtilService) {
  }

  ngOnInit(): void {
    // this.getProv();
    this.getUser();
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
  }




  getProvinces() {
    this.provinces = Object.values(<Province[]>this.dataJson).slice(0, 63);
  }

  // getUser() {
  //   this.userService.currentUser().pipe(
  //     tap(user => {
  //         this.isLoading = true;
  //         this.user = user
  //       }
  //     ),
  //     switchMap(user=>{
  //       if(user){
  //         const province = this._province.find(p => p.ProvinceName === user.province);
  //         return this.getDist(province.ProvinceID).pipe(
  //           switchMap((districts)=>{
  //             this._district = districts;
  //             const district = this._district.find((d => d.DistrictName == user.district));
  //             return this.getWard(district.DistrictID);
  //           })
  //         )
  //       }else{
  //         return null;
  //       }
  //     })
  //   ).subscribe(
  //     {
  //       next: (data) => {
  //         if (data) {
  //           this._ward = data;
  //           this.profileForm.patchValue({
  //             firstname: this.user.firstname,
  //             lastname: this.user.lastname,
  //             username: this.user.username,
  //             email: this.user.email,
  //             dob: this.user.dob,
  //             phone: this.user.phone,
  //             address: this.user.address,
  //             province: this._province.find(p => p.ProvinceName === this.user.province),
  //             district: this._district.find(d => d.DistrictName === this.user.district),
  //             ward: this._ward.find(w => w.WardName === this.user.ward),
  //           });
  //             this.profileForm.get('username').disable();
  //             this.isLoading = false;
  //         }
  //       },
  //       error: (err) => {
  //         this.utilService.openSnackBar(err, 'Đóng');
  //         this.isLoading = false;
  //         console.log(err)
  //       }
  //     }
  //   );
  // }


  getUser() {
    this.isLoading = true;
    this.getProv().pipe(
      tap(prov=> this._province = prov),
      switchMap(() => this.userService.currentUser()),
      tap(user => this.user = user),
      switchMap(user => {
        if (user) {
          const province = this._province.find(p => p.ProvinceName === user.province) ?? null;
          if(province){
            return this.getDist(province.ProvinceID).pipe(
              switchMap((districts) => {
                this._district = districts;
                const district = this._district.find(d => d.DistrictName === user.district) ?? null;
                if(district){
                  return this.getWard(district.DistrictID);
                }else{
                  return of(null);
                }
              })
            );
          }else{
            return of(null);
          }
        } else {
          return of(null); // Return a null observable if user is null
        }
      })
    ).subscribe({
      next: (data) => {
          this._ward = data;
          this.profileForm.patchValue({
            firstname: this.user.firstname,
            lastname: this.user.lastname,
            username: this.user.username,
            email: this.user.email,
            dob: this.user.dob,
            phone: this.user.phone,
            address: this.user.address,
            province: this._province.find(p => p.ProvinceName === this.user.province) ?? null,
            district: this._district.find(d => d.DistrictName === this.user.district) ?? null,
            ward: this._ward !=null ? this._ward.find(w => w.WardName === this.user.ward) : null,
          });
          this.profileForm.get('username').disable();
          this.isLoading = false;
      },
      error: (err) => {
        this.utilService.openSnackBar(err, 'Đóng');
        this.isLoading = false;
        console.log(err);
      }
    });
  }


  getProv(){
    return this.ghnService.getProvinces().pipe(
      tap((data) => {
        this._province = data.map((item) => {
          return {
            Code: item.Code,
            ProvinceID: item.ProvinceID,
            ProvinceName: item.ProvinceName,
          };
        });
      })

    );
  }

  getDist(provinceId: number) {
    return this.ghnService.getDistricts(provinceId).pipe(
      tap((data) => {
        this._district = data.map((item) => {
          return {
            Code: item.Code,
            DistrictID: item.DistrictID,
            DistrictName: item.DistrictName,
          };
        });
      })
    );
  }

  getWard(districtId: number) {
    return this.ghnService.getWards(districtId).pipe(
      tap((data) => {
        this._ward = data.map((item) => {
          return {
            WardCode: item.WardCode,
            WardName: item.WardName,
          };
        });
      })
    );
  }



  onSubmit() {
    if (this.profileForm.valid) {
      const rawValue = this.profileForm.getRawValue();
      const province = rawValue.province;
      const district = rawValue.district;
      const ward = rawValue.ward;
      rawValue.province = province.ProvinceName;
      rawValue.district = district.DistrictName;
      rawValue.ward = ward.WardName;
      this.userService.updateUserInfo(this.user.id, rawValue).subscribe({
        next: (data) => {
          this.utilService.openSnackBar('Cập nhật thành công', 'Đóng')
          console.log(data);
        },
        error: (err) => {
          this.utilService.openSnackBar(err, 'Đóng')
          console.log(err);
        }
      })
    }
  }


  onSubmitPassword() {
    if (this.passwordForm.valid) {
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


  onPChange(event: any){
    if(event){
      console.log(event);
      this.getDist(event.ProvinceID).subscribe(data=>{
        this._district = data;
        console.log(this._district);
      });
    }
  }

  onDChange(event: any){
    if(event){
      this.getWard(event.DistrictID).subscribe(data=>{
        this._ward = data;
        console.log(this._ward);
      });
    }
  }

  onWChange(event:any){
    console.log(event);
  }


}
