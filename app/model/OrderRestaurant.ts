import { CustomerDTO } from "./CustomerDTO";
import { ItemDTO } from "./ItemDTO";

export type OrderRestaurant={
    orderID?:string;
    restaurantID?:string;
    orderDate?:Date;
    customer?:CustomerDTO;
    noOfItems?:number;
    itemList?:ItemDTO[];
    total?:number;
    status?:string;
}