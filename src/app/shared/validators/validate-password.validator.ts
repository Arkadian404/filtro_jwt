import {AbstractControl, FormGroup} from "@angular/forms";

export const validatePassword = (firstControl: string, secondControl: string) => {
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
