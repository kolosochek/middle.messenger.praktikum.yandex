import { UpdateProfileInterface, UpdateProfilePasswordInterface } from "../model/Store";
import { HTTPTransport } from "./HTTPTransport";


export class ProfileAPI extends HTTPTransport {
    public userGetProfileUrl = "/user";
    public userSetProfileUrl = "/user/profile";
    public userSetPasswordUrl = "/user/password";
    public userSearchdUrl = "/user/search";


    async getUserProfileById(userId:string|number) {
        const result = await this.get(`${this.userGetProfileUrl}/${userId}`) 
        return result
    }

    async setUserProfile(userProfile:UpdateProfileInterface) {
        const result = await this.put(`${this.userSetProfileUrl}`, userProfile) 
        return result
    }

    async setUserPassword(userPassword:UpdateProfilePasswordInterface) {
        const result = await this.put(`${this.userSetPasswordUrl}`, userPassword) 
        return result
    }

    async searchUserByLogin(userLogin:string) {
        const result = await this.post(`${this.userSearchdUrl}`, userLogin) 
        return result
    }
}
