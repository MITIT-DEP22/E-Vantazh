import {action, makeAutoObservable, observable} from "mobx";
import {AuthUser, User} from "../model/types";
import AuthService from "../services/AuthService";
import {errorHandler} from "../../errorHandler";
import {AxiosError} from "axios";
import UserService from "../services/UserService";
import {$api} from "../../../app/http";
import {AuthResponse} from "../response/AuthResponse";
import createNewOrderStore from "../../order/store/CreateNewOrderStore";

class UserStore {
    isAuth = false
    isLoading = true
    @observable user: User = {} as User

    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool: boolean) {
        this.isAuth = bool
    }

    setIsLoading(bool: boolean) {
        this.isLoading = bool
    }

    setUser(user: User) {
        this.user = user
    }

    @action
    async login(user: AuthUser) {
        try {
            this.setIsLoading(true)
            const response = await AuthService.login(user.email, user.password)

            localStorage.setItem("token", response.data.accessToken)
            this.setAuth(true)
            await this.getUserProfile()
            return response
        } catch (error) {
            console.log(error)
        } finally {
            this.setIsLoading(false)
        }
    }

    @action
    async registration(user: AuthUser) {
        try {
            this.setIsLoading(true)
            await AuthService.register(user.firstName, user.lastName, user.email, user.password, user.role)
        } catch (error) {
            throw error
        } finally {
            this.setIsLoading(false)
        }
    }

    @action
    async refresh() {
        try {
            if (localStorage.getItem("token")) {
                this.setIsLoading(true)
                const res = await $api.post<AuthResponse>(`/auth/refresh-token`)
                localStorage.setItem("token", res.data.accessToken)
                this.setAuth(true)
                await this.getUserProfile()
                createNewOrderStore.newOrder.customer = userStore.user
            }
        } catch (error) {
            console.log(error)
        } finally {
            this.setIsLoading(false)
        }
    }

    @action
    async getUserProfile() {
        this.setIsLoading(true)
        try {
            const res = await UserService.getProfile()
            this.setUser(res.data)
        } catch (e) {
            errorHandler(e as AxiosError)
        } finally {
            this.setIsLoading(false)
        }
    }

    @action
    logout() {
        this.isAuth = false
        localStorage.removeItem("token")
    }
}

const userStore = new UserStore()
export default userStore;