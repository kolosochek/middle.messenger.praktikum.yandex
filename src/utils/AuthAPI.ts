import { throws } from "assert";
import { HTTPTransport } from "./HTTPTransport";

export interface AuthFormInterface {
    login: string;
    password: string;
}

export interface RegisterFormInterface {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string,
}

/*
{
  "login": "a.morgan",
  "password": "p@ssw0rd"
} 
*/

export class AuthAPI extends HTTPTransport {
    public authUserUrl = "/auth/signin";
    public registerUserUrl = "/auth/signup";
    public logoutUserUrl = "/auth/logout";
    public userInfoUrl = "/auth/user";

    async authorizeUser(authFormData: AuthFormInterface): Promise<Response> {
        return this.post(this.authUserUrl, authFormData)        
    }

    async registerUser(registerFormData: RegisterFormInterface): Promise<Response> {
        return this.post(this.registerUserUrl, registerFormData)    
    }

    async getUserInfo(): Promise<Response> {
        return this.get(this.userInfoUrl)
    }
    
    async logoutUser(): Promise<Response> {
        return this.post(this.logoutUserUrl, {})
    }
    
    public setUserInfo(userObject:object):void {
        window.localStorage.setItem('userObject', JSON.stringify(userObject));
    }
    public getUserId() {
        if (window.localStorage.getItem('userObject')) {
            const userObject = JSON.parse(window.localStorage.getItem('userObject'))
            return userObject.id;
        } else {
            this.getUserInfo()
            .then((user) => {
                this.setUserInfo(user);
                return user.id
            })
            .catch((requestError) => {
                throw new Error(requestError)
            })
        }
    }
}
