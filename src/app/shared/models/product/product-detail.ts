import {Product} from "./product";

export interface ProductDetail{
  id?:number;
  quantity:number;
  weight:number;
  price:number;
  status:boolean;
  product:Product;
}
