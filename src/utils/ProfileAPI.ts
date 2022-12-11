import { HTTPTransport } from "./HTTPTransport";


export class ProfileAPI extends HTTPTransport {
    public userProfileUrl = "/user";


    async getUserProfile(userId:string|number) {
        const result = await this.get(`${this.userProfileUrl}/${userId}`) 
        return result
    }
}
