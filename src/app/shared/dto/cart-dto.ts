import {UserDto} from "./user-dto";
import {Voucher} from "../models/voucher";


export interface CartDto{
  id?:number;
  user?:UserDto;
  createdAt?:Date;
  updatedAt?:Date;
  total?:number;
  status?:boolean;
  voucher?:Voucher;
}
