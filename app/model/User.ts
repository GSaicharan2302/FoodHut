import { Address } from "./Address";
import { Order } from "./Order";

export type User ={
    emailId?:string,
    username?:string,
    contactno?:string,
    address?:Address,
    orderList?:Order[],

}