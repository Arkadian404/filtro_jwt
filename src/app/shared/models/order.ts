import {User} from "./user";

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
  shippingFee?: number;
  notes?: string;
  total?: number;
  orderDate?: Date;
  status?: string;
}
