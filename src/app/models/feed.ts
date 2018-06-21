import { BaseModel } from "./baseModel";

export class Feed extends BaseModel {
  id: number;
  ch_id: number;
  mc_cd: string;
  mobile_name: string;
  field1: string;
  field2: number;
  field3: number;
  field4: number;
  field5: string;
  field1_desc: string;
  field2_desc: string;
  field3_desc: string;
  field4_desc: string;
  field5_desc: string;
  time: string;
  oee: string;
  
  constructor() {  
    super();
  }  
}