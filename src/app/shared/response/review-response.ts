import {ProductResponse} from "./product-response";
import {UserResponse} from "./user-response";

export interface ReviewResponse{
  id?: number;
  product?: ProductResponse;
  user?: UserResponse;
  rating?: number;
  comment?: string;
  created?: string;
  createdAt?: Date;
  parentId?: number;
}
