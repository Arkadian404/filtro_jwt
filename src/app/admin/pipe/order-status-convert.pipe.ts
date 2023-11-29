import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderStatusConvert'
})
export class OrderStatusConvertPipe implements PipeTransform {

  transform(value: string): unknown {
    if(value == 'PENDING'){
      return 'Đang chờ xử lý';
    }else if (value === 'PAID_MOMO'){
      return 'Đã thanh toán qua Momo';
    }else if (value === 'PAID_VNAPAY'){
      return 'Đã thanh toán qua VNPay';
    }else if(value === 'CONFIRMED'){
      return 'Xác nhận đơn hàng';
    }else if(value === 'CANCELED'){
      return 'Đã hủy';
    }else if(value === 'FAILED'){
      return 'Thanh toán thất bại';
    } else {
      return 'Thanh toán khi nhận hàng';
    }
  }

}
