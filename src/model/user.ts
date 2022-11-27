export class User {
    public static getUserProfile(userId?: string|number): object {
        const user = {
            "avatar_url": "https://i.pravatar.cc/130?img=7",
            "login": "sebastian1337",
            "first_name": "Sebastian",
            "last_name": "Pereiro",
            "email": "sebast1an@gmaiz.com",
            "phone": "+71337081488",
            // password hash
            "password": "FGDSA^#RFSGQ@#^&TFH12",
        }
        return user;
    }
    public static getUserProfileById(id:string|number): object {
        const user = {}
        return user;
    }
}
