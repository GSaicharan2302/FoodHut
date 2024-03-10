export interface Customerupdate {
  emailId: string;
  username: string;
  // password: string;
  address: {
    doorNo: string;
    street: string;
    area: string;
    city: string;
    state: string;
    zipcode: string;
  };
  contactNo: string;
}
