import {Wishlist} from "./wishlist";
import {Product} from "./product/product";

export interface WishlistItem{
  id?:number,
  wishlist?:Wishlist,
  product?:Product,
  addDate?:Date
}
