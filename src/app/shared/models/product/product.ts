import {Category} from "../category";
import {Flavor} from "../flavor";
import {Sale} from "../sale";
import {ProductOrigin} from "./product-origin";
import {Vendor} from "../vendor";

export interface Product{
  id?:number;
  name:string;
  description:string;
  createdAt:Date;
  updatedAt:Date;
  isSpecial:boolean;
  origin:ProductOrigin;
  status:boolean;
  category:Category;
  flavor:Flavor;
  sale:Sale;
  vendor: Vendor;
}
