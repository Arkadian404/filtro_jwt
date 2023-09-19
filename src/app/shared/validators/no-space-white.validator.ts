import {ValidatorFn} from "@angular/forms";

export function NoSpaceWhiteValidator(): ValidatorFn{
  // @ts-ignore
  return (control):{[key:string]:any}=>{
    let controlVal = control.value;
    if(typeof controlVal ==='number'){
      controlVal = `${controlVal}`;
    }
    let isWhiteSpace = (controlVal || '').trim().length === 0;
    let isValid = !isWhiteSpace;
    return isValid ? null :  {whitespace:'value is only whitespace!!!'};
  }
}
