import {ProductDetail} from "./product/product-detail";
import {Order} from "./order";

export interface OrderDetail{
  id?: number;
  order?: Order;
  productDetail?: ProductDetail;
  quantity?: number;
  price?: number;
  total?: number;
  orderDate?: Date;
}
