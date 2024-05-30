export enum Role {
  Admin = "admin",
  Supplier = "supplier",
  SupplierSpecialist = "supplySpecialist",
}

export interface Auth {
  isAuthenticated: boolean;
  token: string | undefined;
  role: Role.Admin | Role.Supplier | Role.SupplierSpecialist | undefined;
  email: string | undefined;
}
