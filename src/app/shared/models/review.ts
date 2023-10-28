import {Product} from "./product/product";
import {User} from "./user";

export interface Review{
  id?:number;
  product?:Product;
  user?:User;
  rating?:number;
  comment?:string;
  createdAt?:Date;
  parentId?:number;
}
