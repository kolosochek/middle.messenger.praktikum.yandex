import { AuthAPI } from "../utils/AuthAPI";

export interface ProfileInterface {
    id?: string | number,
    avatar?: string,
    login?: string,
    first_name?: string,
    second_name?: string,
    display_name?: string,
    email?: string,
    phone?: string,
    password?: string,
}
export interface UpdateProfileInterface {
    first_name?: string,
    second_name?: string,
    display_name?: string,
    login?: string,
    email?: string,
    phone?: string,
}

export interface UpdateProfilePasswordInterface {
    oldPassword: string,
    newPassword: string,
}

export interface ChatListItemLastMessageInterface {
    user: {
        first_name: string,
        second_name: string,
        avatar: string,
        email: string,
        login: string,
        phone: string,
    },
    time: string,
    content: string,
}
export interface ChatListItemInterface {
    id: number,
    title: string,
    avatar: string,
    unread_count: number,
    last_message: ChatListItemLastMessageInterface,
}

export interface ChatMessageInterface {
    id: number,
    user_id: number,
    chat_id: number,
    type: string | "message",
    time: string,
    content: string,
    is_read: true,
    file: unknown
}

export interface ChatUserInterface {
    id: number,
    first_name: string,
    ssecond_name: string,
    display_name: string | null,
    login: string,
    avatar: unknown | null,
    email: string,
    phone: string,
    role: "regular" | "admin"
}


export class Store {
    public static authAPI = new AuthAPI();


    public static updateUserProfile() {
        Store.authAPI.getUserInfo()
            .then((profile) => {
                Store.setItem('profile', profile);
                return profile.id;
            })
            .catch((requestError) => {
                throw new Error(requestError)
            })
    }

    public static getUserId() {
        if (Store.getItem('profile')) {
            const profile = Store.getItem('profile')!;
            return profile.id;
        } else {
            return Store.updateUserProfile();
            
        }
    }

    public static getItem(obj: string) {
        if (window.localStorage.getItem(obj)) {
            try {
                return JSON.parse(window.localStorage.getItem(obj)!)
            }
            catch (e) {
                throw new Error(`Can't parse JSON from localStorage. Was looking for ${obj}`);
            }
        } else {
            return false;
        }
    }

    public static setItem(keyName: string, value: object | boolean | string) {
        if (keyName && value) {
            try {
                if (value instanceof Object) {
                    window.localStorage.setItem(keyName, JSON.stringify(value))
                } else {
                    window.localStorage.setItem(keyName, value.toString())
                }

            }
            catch (e) {
                throw new Error(`Can't set { ${keyName}: ${value} }`);
            }
        } else {
            throw new Error(`Can't set object to storage, keyName or value is empty!`);
        }
    }

    public static removeItem(keyName: string) {
        if (keyName) {
            try {
                window.localStorage.removeItem(keyName)
            }
            catch (e) {
                throw new Error(`Can't remove item ${keyName}`);
            }
        } else {
            throw new Error(`Can't remove item from storage, keyName ${keyName} is empty`);
        }
    }

    public static clean(): void {
        Store.removeItem('activeChatId');
        Store.removeItem('chatUsers');
    }
}
