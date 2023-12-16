import {Vehicle} from "../../vehicle/model/types";

export type User = {
    id:string;
    email:string;
    firstName:string;
    lastName:string;
    phone:string;
    role:string;
    companyName:string;
    rating:number;
    countOfOrders:number;
    vehicles:Vehicle[];
    image: any;
    enabled:boolean;
    accountNotExpired:boolean;
    credentialsNonExpired:boolean;
    accountNonLocked:boolean;
    username:string;
}

export type AuthUser = {
    firstName: string,
    lastName: string
    email: string,
    password: string,
    role: string
}

export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN',
    OPERATOR = 'OPERATOR',
    CUSTOMER = 'CUSTOMER'
}
