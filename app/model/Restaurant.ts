import { Address } from "./Address"
import { Order } from "./Order"
import { OrderRestaurant } from "./OrderRestaurant"
import { RestaurantProduct } from "./RestaurantProduct"

export type Restaurant = {
    emailId?:string,
    restaurantname?:string,
    description?:string,
    cuisineType?:string,
    ownername?:string,
    password?:string,
    contactNumber?:number,
    imageID?:string,
    location?:Address,
    listofItems?:RestaurantProduct[],
    orderList?:OrderRestaurant[],
    rating?:number,
    duration?:number,
    price?:number
    category?:string[],
    status?:string
}