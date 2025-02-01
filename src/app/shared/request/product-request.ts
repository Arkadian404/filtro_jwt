export interface ProductRequest{
  name?: string;
  description?: string;
  isSpecial?: boolean;
  isLimited?: boolean;
  status?: boolean;
  brandId?: number;
  categoryId?: number;
  flavorId?: number;
  vendorId?: number;
  originId?: number;
}
