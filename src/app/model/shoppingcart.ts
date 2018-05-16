import { User } from "./customer.model";

export class ShoppingCart {
	public id: number;
	public grandTotal: number;
	public user: User;
}