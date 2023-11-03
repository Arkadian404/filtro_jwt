import {ProductDetail} from "./product/product-detail";
import {Wishlist} from "./wishlist";

export interface WishlistItem{
  id?:number,
  wishlist?:Wishlist,
  productDetail?:ProductDetail,
  addedAt?:Date
}
