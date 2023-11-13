import {OrderDto} from "./order-dto";
import {ProductDetailDto} from "./product-detail-dto";

export interface OrderDetailDto{
  id?: number;
  order?: OrderDto;
  productDetail: ProductDetailDto;
  quantity?: number;
  price?: number;
  total?: number;
  orderDate?: Date;
}
