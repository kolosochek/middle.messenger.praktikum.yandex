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


export class AuthAPI extends HTTPTransport {
    public authUserUrl = "/auth/signin";
    public registerUserUrl = "/auth/signup";
    public logoutUserUrl = "/auth/logout";
    public userInfoUrl = "/auth/user";


    authorizeUser(authFormData: AuthFormInterface): Promise<Response> {
        return this.post(this.authUserUrl, authFormData)        
    }

    registerUser(registerFormData: RegisterFormInterface): Promise<Response> {
        return this.post(this.registerUserUrl, registerFormData)    
    }

    getUserInfo(): Promise<Response> {
        return this.get(this.userInfoUrl)
    }
    
    logoutUser(): Promise<Response> {
        return this.post(this.logoutUserUrl, {})
    }
}
