import {UserDto} from "./user-dto";
import {Product} from "../models/product/product";
import {ProductDto} from "./product-dto";

export interface ReviewDto{
  id?:number;
  product?:ProductDto;
  user?:UserDto;
  rating?:number;
  comment?:string;
  createdAt?:Date;
  parentId?:number;
}
