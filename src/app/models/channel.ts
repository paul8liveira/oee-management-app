import { BaseModel } from "./baseModel";

export class Channel extends BaseModel {
  id: number;
  name: string;
  description: string;
  active: number;
  created_at: string;
  updated_at: string;
  time_shift: number;
  initial_turn: string;
  final_turn: string;
  
  constructor() {
    super();
    this.name = '';
    this.description = '';
    this.active = 1; //ativo
    this.token = ''; //não sera necessario quando ativar o jwt na api
    this.time_shift = 0;     
    this.initial_turn = '07:00';
    this.final_turn = '17:00';
  }  
}