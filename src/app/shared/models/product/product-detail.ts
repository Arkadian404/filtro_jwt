import {Product} from "./product";

export interface ProductDetail{
  id?:number;
  quantity:number;
  sold:number;
  weight:number;
  price:number;
  status:boolean;
  product:Product;
}
