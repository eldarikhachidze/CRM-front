import {SlotMachine} from "./slot-machine";

export interface GameDay {
  id: number;
  date: string;
  total_money: string;
  created_at: string;
  updated_at?: any;
  deleted_at?: any;
}

export interface Dailyamountsbygameday {
  id: number;
  slot_machine: SlotMachine;
  amount: string;
  date: number;
  game_day: number;
}

export interface SlotPit {
  id: number;
  daily_amounts_by_game_day: Dailyamountsbygameday[];
  date: string;
  created_at: string;
  updated_at?: any;
  deleted_at?: any;
}
export interface Group {
  count: number;
  total_money: number;
}
export interface Slotmachinesbybrand {
  brand: Group;
}
export interface Hall {
  id: number;
  slot_machines: SlotMachine[];
  daily_money_sum: number;
  slot_machines_by_brand: Slotmachinesbybrand[];
  name: string;
  created_at: string;
  updated_at?: any;
  deleted_at?: any;
}

export interface FullDatabaseResponse {
  halls: Hall[];
  game_days: any[];
  total_daily_amount: number;
}

