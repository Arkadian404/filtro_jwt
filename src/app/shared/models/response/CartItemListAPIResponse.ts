import {CartItem} from "../cart-item";
import {ProductImage} from "../product/product-image";
import {CartItemDto} from "../../dto/cart-item-dto";


export interface CartItemListAPIResponse{
  cartItemList: Array<CartItemDto>;
  productImages: Array<ProductImage>;
}
