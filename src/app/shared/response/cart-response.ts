import {VoucherResponse} from "./voucher-response";

export interface CartResponse{
  id?: number;
  userId?: number;
  createdAt?: string;
  updatedAt?: string;
  total?: number;
  status?: boolean;
  voucher?: VoucherResponse;
}
