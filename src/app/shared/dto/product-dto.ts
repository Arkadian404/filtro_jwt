import {ProductImageDto} from "./product-image-dto";
import {ProductDetailDto} from "./product-detail-dto";
import {Flavor} from "../models/product/flavor";
import {FlavorDto} from "./flavor-dto";
import {CategoryDto} from "./category-dto";
import {SaleDto} from "./sale-dto";
import {ProductOriginDto} from "./product-origin-dto";
import {VendorDto} from "./vendor-dto";

export interface ProductDto{
  id?:number,
  name?:string,
  images?: ProductImageDto[],
  description?:string,
  productDetails?:ProductDetailDto[],
  flavor?: FlavorDto,
  category?: CategoryDto,
  sale?:SaleDto,
  origin?:ProductOriginDto,
  vendor?:VendorDto,
}
