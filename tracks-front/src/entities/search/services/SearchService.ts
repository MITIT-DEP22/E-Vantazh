import {$apiSearch} from "../../../app/http";
import {Search} from "../model/type";

export default class SearchService {
    static async getOrder(filter:Search) {
        let status = `status=${filter?.status}&`
        let cargoType = `cargoType=${filter?.cargoType}&`
        let rangePriceStart = `rangePrice[start]=${filter?.rangePrice?.start}&`
        let rangePriceEnd = `rangePrice[end]=${filter?.rangePrice?.end}&`
        let rangeMinimalStepStart = `rangeMinimalStep[start]=${filter?.rangMinStep?.start}&`
        let rangeMinimalStepEnd = `rangeMinimalStep[end]=${filter?.rangMinStep?.end}&`
        let rangeDateStart = `rangeDate[start]=${filter?.rangeDate?.start?.toString().split('T')[0]}&`
        let rangeDateEnd = `rangeDate[end]=${filter?.rangeDate?.end?.toString().split('T')[0]}&`
        let search = `_search=${filter?._search}`
        return $apiSearch.get(`/orders?${filter?.status?status:''}${filter?.cargoType?cargoType:''}${filter?.rangePrice?.start?rangePriceStart:''}${filter?.rangePrice?.end?rangePriceEnd:''}${filter?.rangMinStep?.start?rangeMinimalStepStart:''}${filter?.rangMinStep?.end?rangeMinimalStepEnd:''}${filter?.rangeDate?.start?rangeDateStart:''}${filter?.rangeDate?.end?rangeDateEnd:''}${filter?._search?search:''}`)
    }

}