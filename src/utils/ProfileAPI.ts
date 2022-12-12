import { HTTPTransport } from "./HTTPTransport";


export class ProfileAPI extends HTTPTransport {
    public userProfileUrl = "/user";


    async getUserProfileById(userId:string|number) {
        const result = await this.get(`${this.userProfileUrl}/${userId}`) 
        return result
    }
}
