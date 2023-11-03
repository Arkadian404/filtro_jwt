import {User} from "./user";

export interface Wishlist{
  id?:number,
  user?:User,
  createdAt?: Date,
  updatedAt?: Date,
  status?:boolean,
  wishlistItems?: Array<WishlistItem>;
}
