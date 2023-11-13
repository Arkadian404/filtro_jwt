import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'currencyVND'
})
export class CurrencyVNDPipe implements PipeTransform {

  transform(value: number, currencyCode:string = 'VND'): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: currencyCode,
    }).format(value);
  }

}
