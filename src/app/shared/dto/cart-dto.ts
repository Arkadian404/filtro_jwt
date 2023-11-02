import {UserDto} from "./user-dto";


export interface CartDto{
  id?:number;
  user?:UserDto;
  createdAt?:Date;
  updatedAt?:Date;
  total?:number;
}
