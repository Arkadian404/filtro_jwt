import {User} from "./user";
import {ShippingMethod} from "./shipping-method";

export interface Order{
  id?: number;
  orderCode?: string;
  user?: User;
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  province?: string;
  district?: string;
  ward?: string;
  paymentMethod?: string;
  shippingMethod?:ShippingMethod
  notes?: string;
  total?: number;
  orderDate?: Date;
  status?: string;
}
