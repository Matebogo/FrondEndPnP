import { CartItem } from "./cart";
import { Product } from "./product";

export class Order {

	orderID: number;
    orderNumber: number;
    amount: number;
    dateCreated: Date;
    userID: number;
    driverID: number;
    customerName: string;
    houseNo: string ='';
    province: string='';
    address: string='';
    postalCode?: number;
    product:Product;
}