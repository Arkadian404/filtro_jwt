import {CategoryResponse} from "./category-response";

export interface VoucherResponse{
  id?: number;
  name?: string;
  code?: string;
  discount?: number;
  description?: string;
  createdAt?: Date;
  expirationDate?: Date;
  category?: CategoryResponse;
}
