import {Ward} from "./ward";

export interface District{
  code:number;
  codename:string;
  division_type:string;
  name:string;
  province_code:number;
  wards: Array<Ward>;
}
