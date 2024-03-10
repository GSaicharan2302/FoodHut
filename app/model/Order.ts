import { Customer } from "./Customer";
import { Item } from "./Item";

export type Order={
    orderID?:string;
    restaurant?:string;
    orderDate?:Date;
    noOfItems?:number;
    itemList?:Item[];
    total?:number;
    status?:string;
}