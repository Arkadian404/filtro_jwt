import {UserResponse} from "./user-response";

export interface OrderResponse{
  id:number;
  user:UserResponse;
  orderCode:string;
  fullName:string;
  email:string;
  phone:string;
  address:string;
  province:string;
  district:string;
  ward:string;
  notes:string;
  paymentMethod:string;
  deliveryService:string;
  shippingFee:number;
  total:number;
  orderDate:Date;
  status:string;
  discount:number;
}
