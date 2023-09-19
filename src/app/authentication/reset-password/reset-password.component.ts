import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UtilService} from "../../service/util.service";
import {EmailService} from "../../service/email.service";
import {Route, Router} from "@angular/router";
import {validatePassword} from "../../shared/validators/validate-password.validator";

const PASSWORD_PATTERN = /^(?=.*[!@#$%^&*]+)[a-zA-Z0-9!@#$%^&*]/;

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit{
  form:FormGroup;
  constructor(private formBuilder:FormBuilder,
              private emailService:EmailService,
              private utilService:UtilService,
              private router:Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      password: ['',[Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.pattern(PASSWORD_PATTERN)]],
      confirmPassword: ['',Validators.required]
    },
      {validators: validatePassword('password', 'confirmPassword')})
  }

  onSubmit(){
    if(this.form.valid){
      this.emailService.processResetPassword(this.form.value.password).subscribe({
        next: (data) => {
          console.log(data);
          this.utilService.openSnackBar('Đã đổi mật khẩu', 'Đóng')
          this.router.navigate(['/login'])
        },
        error: (error) => {
          this.utilService.openSnackBar(error, 'Đóng')
          console.log(error);
        }
      })
      console.log(this.form.value)
    }
  }
}
