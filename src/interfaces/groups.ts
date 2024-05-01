export interface Group {
  name: string;
  managerPost: string;
  managerFirstName: string;
  managerLastName: string;
  managerMiddleName: string;
  signer: Signer[];
}

export interface Signer {
  post: string;
  firstName: string;
  lastName: string;
  middleName: string;
}
