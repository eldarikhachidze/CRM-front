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

export interface Latestclosefloot {
  id: number;
  close_flot: OpenFlot;
  close_flot_total: number;
  result: number;
  close_date?: any;
  status: string;
  fill_credit: number;
  created_at: string;
  updated_at?: any;
  deleted_at?: any;
}

export interface Table {
  id: number;
  hall: string;
  last_result: number;
  latest_plaque: Plaque;
  latest_close_floot: Latestclosefloot;
  total_credit_today: number;
  total_fill_today: number;
  name: string;
  open_flot_total: number;
  result: number;
  date_created: string;
  date_edited?: any;
  date_deleted?: any;
  open_flot: OpenFlot;
}

export interface TableHall {
  id: number;
  name: string;
  created_at: string;
  updated_at?: any;
  deleted_at?: any;
  tables: Table[];
}

// src/app/pages/table/close-flot-data.model.ts
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
