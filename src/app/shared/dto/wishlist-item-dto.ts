import {WishlistDto} from "./wishlist-dto";
import {ProductImageDto} from "./product-image-dto";
import {ProductDetailDto} from "./product-detail-dto";

export interface WishlistItemDto{
  id?:number,
  wishlist?:WishlistDto,
  productName?: string,
  slug?: string,
  productImage?:ProductImageDto;
  productDetail?: ProductDetailDto,
  addedAt?:Date
}
