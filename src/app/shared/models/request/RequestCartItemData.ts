import {CartItem} from "../cart-item";

export interface RequestCartItemData{
  cartItems: Array<CartItem>;
  productDetailIds: Array<number>;
}
