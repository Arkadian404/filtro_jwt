import {User} from "./user";
import {ShippingMethod} from "./shipping-method";
import {OrderDetail} from "./order-detail";

export interface Order{
  id?: number;
  orderCode?: string;
  user?: User;
  orderDetails?:OrderDetail[];
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  province?: string;
  district?: string;
  ward?: string;
  paymentMethod?: string;
  shippingMethod?:ShippingMethod
  shippingFee?: number;
  notes?: string;
  total?: number;
  orderDate?: Date;
  status?: string;
}
