export interface Sale{
  id?:number;
  name:string;
  description:string;
  start:Date;
  end:Date;
  discount:number;
  status:boolean;
}
