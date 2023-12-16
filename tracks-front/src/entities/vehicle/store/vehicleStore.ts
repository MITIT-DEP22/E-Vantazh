import {action, makeAutoObservable, observable} from "mobx";
import {Vehicle} from "../model/types";
import VehicleService from "../services/VehicleService";

class VehicleStore {
    isLoading = true
    @observable vehicles: Vehicle[] = []

    constructor() {
        makeAutoObservable(this)
    }

    setIsLoading(bool: boolean) {
        this.isLoading = bool
    }

    setVehicles(arr: Vehicle[]) {
        this.vehicles = arr
    }

    @action
    async getVehicles() {
        try {
            this.setIsLoading(true)
            const response = await VehicleService.getVehicles()
            this.setVehicles(response.data)
            return response.data
        } catch (err) {
            console.log(err)
        } finally {
            this.setIsLoading(false)
        }
    }

}

const vehicleStore = new VehicleStore()
export default vehicleStore;