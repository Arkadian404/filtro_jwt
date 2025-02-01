import {ProductResponse} from "./product-response";
import {WishlistResponse} from "./wishlist-response";

export interface WishlistItemResponse{
  id?: number;
  wishlist?: WishlistResponse;
  product?: ProductResponse;
  addDate?: Date;
}
