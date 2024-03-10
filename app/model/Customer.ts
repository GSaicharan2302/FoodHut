import { Address } from "./Address";
import { Item } from "./Item";
import { Order } from "./Order";

export type Customer ={
    emailId?:string,
    username?:string,
    contactno?:string,
    address?:Address,
    orderList?:Order[],
    favourites?:string[],
    favouriteProducts?:string[],
    cart?:Item[],
    deliveryAddress?:Address
}