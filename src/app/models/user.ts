import { BaseModel } from "./baseModel";

export class User extends BaseModel {
  id: number;
  username: string;
  password: string;
  active: number;
  admin: number;
  created_at: string;
  company_name: string;
  phone: string;
  isMobile: number;
  
  constructor() {
    super();
    this.admin = 0;
    this.active = 1;
    this.isMobile = 1;
  }  
}