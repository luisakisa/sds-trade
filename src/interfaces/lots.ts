export interface Requests {
  id: number;
  positionId: number;
  count: number;
  priceForOne: number;
  itemName: string;
  deliveryTime: number;
  supplier: Supplier;
}

export interface Supplier {
  id: number,
  name: string,
}
export interface Lot {
  id: number;
  canOwnWay: boolean;
  closeDate: string;
  groupEts: string;
  lotCreator: string;
  lotFiles: LotFile[] | undefined;
  name: string;
  openDate: string;
  rules: Rules;
  status: string;
  positions?: Position[];
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
  requests?: Requests[];
}

export interface File {
  path: string;
  supplierId: number;
}

export interface LotFile {
  lotId: number;
  path: string;
}

export interface Rule {
  comment: string;
  payment: Payment;
  shippingMethod: string;
  supplierId: number;
}

export interface Payment {
  method: string;
  value?: number;
}


export interface Rules {
  comment: string;
  paymentMethod: string;
  shippingMethod: string;
}

export interface List {
 lot : Lot
  rules: Rules[];


  positions: Position[];
  files?: File[];
  requests: Requests[];
}

