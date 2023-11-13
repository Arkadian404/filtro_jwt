import {UserDto} from "./user-dto";

export interface OrderDto{
  id?: number;
  orderCode?: string;
  user?: UserDto;
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  province?: string;
  district?: string;
  ward?: string;
  paymentMethod?: string;
  notes?: string;
  shippingFee?: number;
  total?: number;
  orderDate?: Date;
  status?: string;

}
