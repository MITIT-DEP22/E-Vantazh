import {action, makeAutoObservable, observable} from "mobx";
import {Operator} from "../model/type";
import OperatorService from "../services/OperatorService";

class OperatorsStore {
    isLoading = true
    @observable operators: Operator[] = []

    constructor() {
        makeAutoObservable(this)
    }


    setIsLoading(bool: boolean) {
        this.isLoading = bool
    }

    setOperators(operators: Operator[]) {
        this.operators = operators
    }

    @action
    async getOperators() {
        try {
            this.setIsLoading(true)
            const res = await OperatorService.getOperator()
            this.setOperators(res && res.data)
            return res
        } catch (error) {
            console.log(error)
        } finally {
            this.setIsLoading(false)
        }
    }
    @action
    async getOperatorById(id:string) {
        try {
            this.setIsLoading(true)
            const operator = await OperatorService.getOperatorById(id)
            return operator
        } catch (error) {
            console.log(error)
        } finally {
            this.setIsLoading(false)
        }
    }
}

const   operatorsStore = new OperatorsStore()
export default operatorsStore;