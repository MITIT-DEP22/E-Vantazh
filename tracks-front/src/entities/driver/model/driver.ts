import {User} from "../../user/model/types";

export type Driver = {
    id: string
    operator: User,
    name: string,
    surname: string,
    typeOfLicense: string,
    image: {
        id: number,
        fileName: string,
        mimeType: string,
        path: string
    }
}