export interface VoucherRequest{
  name?: string;
  discount?: number;
  description?: string;
  expirationDate?: Date
  categoryId?: number;
}
