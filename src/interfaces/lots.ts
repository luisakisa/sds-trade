export interface Request {
  id: number;
  quantity: number;
  price: number;
  name: string;
  deliveryTime: string;
  supplier: string;
}

export interface Lot {
  id: number;
  canOwnWay: boolean;
  closeDate: string;
  groupEts: string;
  lotCreator: string;
  lotFiles: undefined;
  name: string;
  openDate: string;
  rules: Rules;
  status: string;
  positions: Position[];
}
export interface Rules {
  comment: string;
  paymentMethod: string;
  shippingMethod: string;
}

export interface Position {
  id: number;
  itemName: string;
  count: number;
  priceForOne: number;
  unitName: string;
  requests: Request[];
}
