import {$api} from "../../../app/http";
import {Operator} from "../model/type";

export default class OperatorService {
    static async getOperator() {
        return $api.get<Operator[]>("/users/operators")
    }

    static async getOperatorById(id:string) {
        return $api.get<Operator>(`/users/operators/${id}`)
    }

}