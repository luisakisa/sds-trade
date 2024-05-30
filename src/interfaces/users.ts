interface User {
    id: number;
    email: string;
    password: string;
  }
  
  interface SupplierFullData extends User {
    typeOfBusiness: string;
    company: string;
    firstName: string;
    lastName: string;
    middleName: string;
    phoneNumber: string;
    regionOrAddress: string;
    site: string;
    inn: number;
    kpp: number;
    isApproved: boolean;
    groupEtsId: number[];
    groupEts: string[];
  }
  
  interface SupplySpecialistFullData extends User {
    groupEtsId: number[];
  }