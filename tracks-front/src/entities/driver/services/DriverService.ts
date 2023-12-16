import {Driver} from "../model/driver";
import {$api} from "../../../app/http";

export default class DriverService {
    static async createDriver(driver: Driver){
        return $api.post<Driver>('/drivers', {...driver})
    }
    static async deleteDriver(driver_id: string){
        return $api.delete(`/drivers/${driver_id}`)
    }
    static async getDrivers() {
        return $api.get<Driver[]>('/drivers')
    }
}


