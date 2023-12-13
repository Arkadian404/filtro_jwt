import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {Router} from "@angular/router";
import {AuthenticationService} from "../../../../service/user/authentication.service";
import {TokenService} from "../../../../service/token.service";
import {UtilService} from "../../../../service/util.service";
import {AuthenticationRequest} from "../../../../shared/models/auth/authentication-request.interface";

@Component({
  selector: 'app-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit{
  form:FormGroup;
  passwordType = false;
  constructor(private formBuilder: FormBuilder,
              private jwtService:AuthenticationService,
              private tokenService:TokenService,
              private utilService:UtilService,
              private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  public login(authRequest:AuthenticationRequest){
    this.jwtService.authenticateEmployee(authRequest).subscribe({
      next:(data)=>{
        console.log(data);
        this.tokenService.setAccessToken(data.accessToken);
        this.tokenService.setRefreshToken(data.refreshToken);
        this.utilService.openSnackBar('Đăng nhập thành công', 'Đóng')
        this.router.navigateByUrl('/admin/home');
      },
      error:(err)=>{
        console.log(err);
        this.utilService.openSnackBar(err, 'Đóng')
      }
    })
  }

  onSubmit():void{
    if(this.form.valid) {
      this.login(this.form.value);
      console.log(this.form.value);
    }
  }

}
