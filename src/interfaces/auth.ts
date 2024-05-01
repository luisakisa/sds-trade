export enum Role {
  Admin = "Admin",
  Supplier = "Supplier",
  SupplierSpecialist = "Supplier Specialist",
}

export interface Auth {
  isAuthenticated: boolean;
  token: string | undefined;
  role: Role.Admin | Role.Supplier | Role.SupplierSpecialist | undefined;
  email: string | undefined;
}
