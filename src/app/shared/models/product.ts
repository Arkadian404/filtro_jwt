import {Category} from "./category";
import {Flavor} from "./flavor";
import {Sale} from "./sale";

export interface Product{
  id?:number;
  name:string;
  quantity:number;
  sold:number;
  description:string;
  price:number;
  createdAt:Date;
  updatedAt:Date;
  status:boolean;
  category:Category;
  flavor:Flavor;
  sale:Sale;
}
