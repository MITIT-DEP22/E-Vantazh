import {User} from "../../user/model/types";
import {Cargo} from "../../cargo/model/types";
import {RouteRequest} from "../../map/models/map-request";

export type Order = {
    id: string;
    customer: User;
    winner: User;
    files: number[]
    cargos: Cargo[]
    title: string;
    description: string;
    price: number;
    minimalStep: number;
    requirements: Requirement[];
    status: string;
    route: RouteRequest;
    routeId: number;
    tenderStart: Date;
}

export type Requirement = {
    requirement: string;
}