export class BaseModel {
  success: boolean;
  message: string;
  device: string;

  constructor() {
    this.device = "mobile";
  }  
}