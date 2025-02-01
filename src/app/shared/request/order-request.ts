export interface OrderRequest{
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
  status:string;
}
