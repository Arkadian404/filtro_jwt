import {Category} from "./category";
import {Flavor} from "./flavor";
import {Sale} from "./sale";

export interface Product{
  id?:number;
  name:string;
  quantity:number;
  sold:number;
  image:string;
  description:string;
  price:number;
  createdAt:Date;
  status:boolean;
  category:Category;
  flavor:Flavor;
  sale:Sale;
}
