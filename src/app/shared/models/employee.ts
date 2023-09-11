import {User} from "./user";

export interface Employee{
  id?:number;
  startOn:Date;
  user:User;
}
