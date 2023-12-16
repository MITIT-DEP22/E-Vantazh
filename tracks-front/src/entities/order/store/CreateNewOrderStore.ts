import {action, makeAutoObservable, observable} from "mobx";
import {Order} from "../model/types";
import {Cargo} from "../../cargo/model/types";
import {$api} from "../../../app/http";

class CreateNewOrderStore {
    @observable newOrder: Order = {
        cargos: [{} as Cargo]
    } as Order

    constructor() {
        makeAutoObservable(this)
    }

    @action
    changeOrder(value: Order) {
        this.newOrder = value
    }

    @action
    async sendOrder() {
        $api.post("/routes", this.newOrder.route).then(res => {
            this.newOrder.routeId = res.data.id
        }).then(() => {
            $api.post("/orders", this.newOrder).then(res => {
                console.log(res)
            }).catch(e => {
                console.log(e)
            })
        }).catch(e => {
            console.log(e)
        }).finally(() => {
            return
        })
    }

}

const createNewOrderStore = new CreateNewOrderStore()
export default createNewOrderStore;