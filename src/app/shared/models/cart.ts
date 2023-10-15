import {User} from "./user";
import {CartItem} from "./cart-item";


export interface Cart{
  id?: number,
  user: User,
  createdAt?: Date,
  updatedAt?: Date,
  total?:number,
  status?:boolean,
  cartItems: Array<CartItem>;
}
