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

export interface Hall {
  id: number;
  slot_machines: SlotMachine[];
  name: string;
  created_at: string;
  updated_at?: any;
  deleted_at?: any;
}

export interface FullDatabaseResponse {
  halls: Hall[];
  game_days: SlotPit[];
}
