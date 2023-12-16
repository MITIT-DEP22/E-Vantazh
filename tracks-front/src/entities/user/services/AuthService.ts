import {AxiosResponse} from "axios";
import {$api} from "../../../app/http";
import {AuthResponse, RegisterAuthResponse} from "../response/AuthResponse";

export default class AuthService {

    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>("/auth/authenticate", {email, password})
    }

    static async register(firstName: string, lastName: string, email: string, password: string, role: string): Promise<AxiosResponse<RegisterAuthResponse>> {
        return $api.post<RegisterAuthResponse>("/auth/register", {firstName, lastName, email, password, role})
    }

}