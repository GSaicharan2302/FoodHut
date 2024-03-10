import { Address } from "./Address";

export type CustomerDTO={
    customerName?:string;
    address?:Address;
    phoneNo?:number;
    emailId?:string;
    deliveryAddress?:Address;
}