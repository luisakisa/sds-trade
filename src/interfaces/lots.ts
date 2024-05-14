export interface Request {
    id: number;
    quantity: number;
    price: number;
    name: string;
    deliveryTime: string;
    supplier: string;
  }
  
  export interface Position {
    id: number;
    name: string;
    quantity: number;
    price: number;
    requests: Request[];
    winner: string;
  }
  
  export interface Lot {
    id: number;
    name: string;
    endDate: string;
    startDate: string;
    status: string;
    possibility: boolean;
    recipient: string;
    positions: Position[];
    group: string;
    deliveryType: string;
    paymentType: string;
    comment: string;
  }

    export interface Lot_new {
    canOwnWay: boolean;
    closeDate: string;
    groupEts: string;
    id: number;
    lotCreator: string;
    lotFiles: undefined;
    name: string;
    openDate: string;
    rules: Rules;
    status: string;
    positions: Position_new[];
  }
   export interface Rules{
    comment: string;
    paymentMethod: string;
    shippingMethod: string;
  }

  export interface Position_new {
    id: number;
    itemName: string;
    count: number;
    priceForOne: number;
    unitName: string;
  }