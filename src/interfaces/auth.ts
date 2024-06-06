export enum Role {
  Admin = "Admin",
  Supplier = "supplier",
  SupplierSpecialist = "supplySpecialist",
}

export interface Auth {
  isAuthenticated: boolean;
  token: string | undefined;
  role: Role.Admin | Role.Supplier | Role.SupplierSpecialist | undefined;
  email: string | undefined;
  id: number | undefined;
}
