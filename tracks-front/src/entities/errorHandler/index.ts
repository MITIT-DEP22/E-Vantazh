import {AxiosError} from "axios";

export const errorHandler = (e: AxiosError) => {
    if(e.code === "ERR_NETWORK") {
        window.location.href = '/500'
        return true
    }

    if(!e.request.status) {
        return true
    }

    if(e.request.status === 403) {
        window.location.href = "/403"
        return true
    }

    if(e.request.status === 404) {
        window.location.href = "*"
        return true
    }


    return false
}