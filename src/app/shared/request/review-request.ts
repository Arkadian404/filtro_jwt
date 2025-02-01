export interface ReviewRequest{
  productId?: number;
  userId?: number;
  rating?: number;
  comment?: string;
  parentId?: number;
}
