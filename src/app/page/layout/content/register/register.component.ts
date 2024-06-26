import { Component, OnInit } from '@angular/core';
import {Register} from "../../../../shared/models/auth/register.interface";
import {AbstractControl, FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../../service/user/authentication.service";
import {UtilService} from "../../../../service/util.service";
import {NoSpaceWhiteValidator} from "../../../../shared/validators/no-space-white.validator";
import {Router} from "@angular/router";


const PASSWORD_PATTERN = /^(?=.*[!@#$%^&*]+)[a-zA-Z0-9!@#$%^&*]/;
const NAME_PATTERN = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵýỷỹ\s|_]+$/;

const validatePassword = (firstControl: string, secondControl: string) => {
  return function (formGroup: FormGroup) {
    const firstControlValue = formGroup.get(firstControl)?.value;
    const {value: secondControlValue} = formGroup.get(secondControl) as AbstractControl;
    return firstControlValue === secondControlValue ? null : {
      invalidConfirmPassword: true,
      firstControl,
      secondControl
    }
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  form:FormGroup;
  submitted = false;
  passwordType = false;
  constructor(private formBuilder:FormBuilder,
              private jwtService: AuthenticationService,
              private router: Router,
              private utilService:UtilService) {
  }

  ngOnInit(){
    this.form = this.formBuilder.group({
      firstname: ['', [Validators.required,NoSpaceWhiteValidator(), Validators.pattern(NAME_PATTERN) ]],
      lastname: ['', [Validators.required, NoSpaceWhiteValidator(), Validators.pattern(NAME_PATTERN)]],
      email: ['', [Validators.required, Validators.email, NoSpaceWhiteValidator()]],
      username: ['', [Validators.required, NoSpaceWhiteValidator()]],
      password: ['', [Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.pattern(PASSWORD_PATTERN)]],
      confirmPassword: ['', [Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.pattern(PASSWORD_PATTERN)]]
    },{
      validators: validatePassword('password', 'confirmPassword')
    });
  }


  public registerUser(register:Register){
    const resp = this.jwtService.register(register);
    resp.subscribe({
      next: (data) => {
        console.log(data);
        this.utilService.openSnackBar('Đăng ký thành công', 'Đóng')
        this.form.reset();
        this.form.markAsPristine();
        this.form.markAsUntouched();
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.utilService.openSnackBar(error, 'Đóng');
        console.log(error);
    }});

  }

  onSubmit(){
    this.submitted = true;
    if(this.form.invalid){
      return;
    }
    console.log(this.form.value);
    this.registerUser(this.form.value);
  }
}
