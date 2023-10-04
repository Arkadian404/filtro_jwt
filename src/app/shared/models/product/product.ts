import {Category} from "./category";
import {Flavor} from "./flavor";
import {Sale} from "./sale";
import {ProductOrigin} from "./product-origin";
import {Vendor} from "./vendor";
import {Brand} from "./brand";

export interface Product{
  id?:number;
  name:string;
  brand:Brand;
  description:string;
  sold:number;
  createdAt:Date;
  updatedAt:Date;
  isSpecial:boolean;
  isLimited:boolean;
  origin:ProductOrigin;
  status:boolean;
  category:Category;
  flavor:Flavor;
  sale:Sale;
  vendor: Vendor;
}
