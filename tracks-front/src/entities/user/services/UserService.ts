import {AxiosResponse} from "axios";
import {$api} from "../../../app/http";
import {User} from "../model/types";

export default class UserService {
    static async getProfile(): Promise<AxiosResponse<User>> {
        return $api.get<User>("/users/profile")
    }

}