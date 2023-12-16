import {action, makeAutoObservable, observable} from "mobx";
import {Order} from "../model/types";
import {$api} from "../../../app/http";

class OrderStore {
    @observable orders: Order[] = []
    @observable isLoading: boolean = true
    constructor() {
        makeAutoObservable(this)
    }

    @action
    getOrders() {
        $api.get("/orders").then(res => {
            this.orders = res.data.content
        }).then(()=>{
            this.isLoading = false
        }).catch(e => {
            console.log(e)
        })
    }

    @action
    setOrders(_orders: Order[]) {
        if (!_orders) {
            return;
        }
        this.orders = _orders
    }
}

const orderStore = new OrderStore()
export default orderStore