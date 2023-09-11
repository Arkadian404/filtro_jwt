import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusConvert'
})
export class StatusConvertPipe implements PipeTransform {

  transform(value: boolean): unknown {
    return value ? 'Mở' : 'Đóng';
  }

}
