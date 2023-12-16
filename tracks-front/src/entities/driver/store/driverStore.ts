import {action, makeAutoObservable, observable} from "mobx";
import {Driver} from "../model/driver";
import DriverService from "../services/DriverService";
import userStore from "../../user/store/userStore";

class DriverStore {
    @observable drivers: Driver[] = []

    constructor() {
        makeAutoObservable(this)
    }

    @action
    async createDriver(driver: Driver) {
        try {
            return await DriverService.createDriver(driver)
        } catch (err) {
            console.log(err)
        }
    }

    @action
    async deleteDriver(driver: Driver) {
        try {
            await DriverService.deleteDriver(driver.id)
        } catch (err) {
            console.log(err)
        }
    }

    @action
    async getDrivers() {
        try {
            const res = await DriverService.getDrivers()
            this.drivers = res.data
            return res.data
        } catch (err) {
            console.log(err)
        }
    }

}

const driverStore = new DriverStore()
export default driverStore;