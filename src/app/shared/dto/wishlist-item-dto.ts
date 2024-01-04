import {WishlistDto} from "./wishlist-dto";
import {ProductImageDto} from "./product-image-dto";
import {ProductDetailDto} from "./product-detail-dto";
import {ProductDto} from "./product-dto";

export interface WishlistItemDto{
  id?:number,
  wishlist?:WishlistDto,
  product?:ProductDto,
  addDate?:Date,
  isAdded?:boolean
}
