import { BaseModel } from "./baseModel";

export class Feed extends BaseModel {
  id: number;
  ch_id: number;
  mc_cd: string;
  field2: number;
  field4: number;
  time: string;
  oee: string;
  
  constructor() {  
    super();
  }  
}