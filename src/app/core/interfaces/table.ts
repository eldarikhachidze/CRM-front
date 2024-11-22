export interface OpenFlot {
  [denomination: string]: number; // This allows string keys for denominations
  quantity: number;
}

export interface Plaque {
  id: number;
  plaques: OpenFlot;
  plaques_total: number;
  result: number;
  status: string;
  game_day: number;
  created_at: string;
  updated_at?: any;
  deleted_at?: any;

}

export interface Table {
  id: number;
  name: string;
  open_flot_total: number;
  open_flot: OpenFlot;
  status: boolean;
  close_flot: OpenFlot;
  close_flot_total: number;
  close_date?: string;
  close_date_updated?: string;
  fill_credit: number;
  result: number;
  plaques_total: number;
  plaques: OpenFlot;
  plaques_date: string;
  plaques_updated?: string;
  table_result: number;
}

export interface TableHall {
  id: number;
  name: string;
  created_at: string;
  updated_at?: any;
  deleted_at?: any;
  tables: Table[];
}

export interface CloseFlotData {
  table_id: number;
  game_day: number;
  close_flot: { [denomination: string]: number };
}

export interface GameDay {
  id: number;
  date: string;
  created_at: string;
  updated_at?: any;
  deleted_at?: any;
}

export interface Chip {
  id: string;
  denomination: string;
  date_created: string;
  date_edited?: any;
  date_deleted?: any;
}
