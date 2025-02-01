import {ProductDetailResponse} from "./product-detail-response";
import {ProductImageResponse} from "./product-image-response";
import {BrandResponse} from "./brand-response";
import {CategoryResponse} from "./category-response";
import {FlavorResponse} from "./flavor-response";
import {ProductOriginResponse} from "./product-origin-response";
import {VendorResponse} from "./vendor-response";

export interface ProductResponse{
  id?: number;
  name?: string;
  slug?: string;
  description?: string;
  rating?: number;
  sold?: number;
  createdAt?: Date;
  updatedAt?: Date;
  isSpecial?: boolean;
  isLimited?: boolean;
  status?: boolean;
  productDetails?: ProductDetailResponse[];
  images?: ProductImageResponse[];
  brand?: BrandResponse;
  category?: CategoryResponse;
  flavor?: FlavorResponse;
  vendor?: VendorResponse;
  productOrigin?: ProductOriginResponse;
}
