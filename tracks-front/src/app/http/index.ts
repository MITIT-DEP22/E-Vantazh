import axios from "axios";

export const $api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

export const $apiGai = axios.create({
    baseURL: process.env.REACT_APP_MVS_URL
})


export const $apiSearch = axios.create({
    baseURL: process.env.REACT_APP_SEARCH_URL
})


$apiSearch.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    return config
})

$apiGai.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    return config
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    return config
})
