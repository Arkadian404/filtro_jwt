import {UserDto} from "./user-dto";

export interface WishlistDto{
  id?:number,
  user?:UserDto,
  createdAt?:Date;
  updatedAt?:Date;
  status?:boolean;
}
