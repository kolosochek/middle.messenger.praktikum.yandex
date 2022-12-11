export interface ProfileInterface {
    //
    id?: string|number,
    avatar?: string,
    //
    avatar_url?: string,
    login?: string,
    first_name?: string,
    second_name?: string,
    email?: string,
    phone?: string,
    password?: string, 
}

export class User {
    public static getUserProfile(): ProfileInterface {
        const user = {
            "avatar_url": "https://i.pravatar.cc/130?img=7",
            "login": "sebastian1337",
            "first_name": "Sebastian",
            "second_name": "Pereiro",
            "email": "sebast1an@gmaiz.com",
            "phone": "+71337081488",
            // password hash
            "password": "FGDSA^#RFSGQ@#^&TFH12",
        }
        return user;
    }
}
