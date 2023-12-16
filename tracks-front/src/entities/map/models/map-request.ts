import {AddressComponent, DirectionMode} from "./index";

export interface RouteDuration {
    duration_string: string,
    duration: number
}

export interface RouteDistance {
    distance_string: string,
    distance: number
}

export interface LocationRequest {
    lng: number,
    ltd: number
}

export interface PointRequest {
    sequence: number,
    formatted_address: string,
    point_address: AddressComponent,
    location:LocationRequest
}

export interface RouteRequest {
    route_duration: RouteDuration,
    route_distance: RouteDistance,
    points: PointRequest[],
    direction_mode: DirectionMode,
    direction_json: string,
    is_back_direction: boolean,
    route_from: Date,
    route_to: Date,
}
