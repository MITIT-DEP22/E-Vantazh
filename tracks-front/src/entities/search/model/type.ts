export type Search = {
    status: string,
    cargoType: string,
    rangePrice: {
        start: number,
        end: number
    },
    rangMinStep: {
        start: number,
        end: number
    },
    rangeDate: {
        start: Date,
        end: Date
    },
    _search: string
}