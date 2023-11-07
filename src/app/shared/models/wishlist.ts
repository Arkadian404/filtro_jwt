import {User} from "./user";
import {WishlistItem} from "./wishlist-item";

export interface Wishlist{
  id?:number,
  user?:User,
  createdAt?: Date,
  updatedAt?: Date,
  status?:boolean,
  wishlistItems?: Array<WishlistItem>;
}
