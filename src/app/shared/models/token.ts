import {User} from "./user";

export interface Token{
  id?:number;
  token:string;
  tokenType:string;
  expired:boolean,
  revoked:boolean,
  user:User
}
