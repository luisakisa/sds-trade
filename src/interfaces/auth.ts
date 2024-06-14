export enum Role {
  Admin = "Admin",
  Supplier = "supplier",
  SupplierSpecialist = "supplySpecialist",
  SecuritySpecialist = "Security_specialist"
}

export interface Auth {
  isAuthenticated: boolean;
  token: string | undefined;
  role: Role.Admin | Role.Supplier | Role.SupplierSpecialist | Role.SecuritySpecialist | undefined;
  email: string | undefined;
  id: number | undefined;
}
