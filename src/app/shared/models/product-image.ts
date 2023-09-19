import {Product} from "./product";

export interface ProductImage{
  id?:number
  imageName?:string,
  url?:string,
  createdAt?:Date,
  updatedAt?:Date,
  status?:boolean,
  product:Product,
}
