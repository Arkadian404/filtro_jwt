import {Category} from "./product/category";

export interface Voucher{
  id?:number;
  name?:string;
  code?:string;
  discount?:number;
  description?:string;
  createdAt?:Date;
  expiredAt?:Date;
  category?:Category;
}
