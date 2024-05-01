export interface SupplierProperties {
  email: string;
  password: string;
  type_of_business: number;
  company: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  phone_number?: string | null;
  region_or_address: string;
  NDS: boolean;
  site?: string | null;
  INN: number;
  KPP: number;
  groupEtsId: number[];
}

export interface SupplierSpecialist {
  email: string;
  password: string;
  groupEtsId: number[];
}
