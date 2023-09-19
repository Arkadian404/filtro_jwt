export interface User{
  id?:number;
  firstname:string;
  lastname:string;
  username:string;
  email:string;
  password:string;
  dob:Date;
  address:string;
  province:string;
  district:string;
  ward:string;
  phone:string;
  role?:string;
  enabled:boolean;
}
