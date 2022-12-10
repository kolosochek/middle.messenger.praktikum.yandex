import { HTTPTransport } from "./HTTPTransport";


export class ProfileAPI extends HTTPTransport {
    public userProfileUrl = "/user";


    async getUserProfile(userId:string|number): Promise<Response> {
        return this.get(`${this.userProfileUrl}/${userId}`)        
    }
}
