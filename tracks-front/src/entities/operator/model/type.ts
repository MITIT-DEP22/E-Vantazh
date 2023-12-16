import {Vehicle} from "../../vehicle/model/types";
import {Driver} from "../../driver/model/driver";

export type Operator = {
    id: number
    email: string,
    firstName: string,
    lastName: string,
    phone: string,
    companyName: string,
    rating: number,
    countOfOrders: number,
    image: any
    vehicles: Vehicle[],
    drivers: Driver[]
}