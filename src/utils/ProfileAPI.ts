import { UpdateProfileInterface, UpdateProfilePasswordInterface } from "../model/Store";
import { HTTPTransport } from "./HTTPTransport";


export class ProfileAPI extends HTTPTransport {
    public userGetProfileUrl = "/user";
    public userSetProfileUrl = "/user/profile";
    public userSetPasswordUrl = "/user/password";
    public userSearchUrl = "/user/search";
    public userChangeAvatarUrl = "/user/profile/avatar";


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
        const result = await this.post(`${this.userSearchUrl}`, userLogin) 
        return result
    }

    async changeUserAvatar(formData:FormData) {
        const result = await this.put(`${this.userChangeAvatarUrl}`, formData) 
        return result
    }
}
