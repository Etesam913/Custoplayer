export interface CustoplayerProps {
  values: CustoplayerValues;
}

export interface CustoplayerValues {
  src: string;
  item1?: CustoplayerItem;
  item2?: CustoplayerItem;
  item3?: CustoplayerItem;
  item4?: CustoplayerItem;
  item5?: CustoplayerItem;
  item6?: CustoplayerItem;
  item7?: CustoplayerItem;
}

export interface CustoplayerItem {
  id: string;
  color?: string;
}