import axios, {AxiosResponse} from "axios";
import {Vehicle} from "../model/types";
import {$api, $apiGai} from "../../../app/http";

export default class VehicleService {
    static async getVehicles(): Promise<AxiosResponse<Vehicle[]>> {
        return $api.get<Vehicle[]>('/vehicles')
    }
}