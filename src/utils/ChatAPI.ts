import { HTTPTransport } from "./HTTPTransport";


export interface ChatListMessageInterface {
        id: number,
        title: string,
        avatar: string | null,
        created_by: number,
        unread_count: number,
        last_message: unknown
}

export class ChatAPI extends HTTPTransport{
    public chatListUrl = '/chats'
    public createChatUrl = '/chats'
    public chatTokenUrl = '/chats/token/'
    public findUserUrl = '/user/search/'
    public addRemoveUserUrl = '/chats/users/'
    public userId:string;

    async getChatList():Promise<Response>{
        return this.get(this.chatListUrl)
    }

    async getChatToken(id:number|string):Promise<Response>{
        return this.post(`${this.chatTokenUrl}${id}`, {});
    }

    async getChatUsers(chatId:number|string):Promise<Response>{
        return this.get(`/chats/${chatId}/users`)
    }

    async createChat(title:string){
        return this.post(this.createChatUrl, { data: { 'title': `${title}` }})
    }

    async deleteChat(chatId:string){
        return this.delete(this.createChatUrl, { data: { 'chatId': Number(chatId) }})
    }

    async findUser(query: Record<string, string>){
        return this.post(this.findUserUrl, { data: query })
    }

    async addUser(query: Record<string, string | string[]>){
        return this.put(this.addRemoveUserUrl, { data: query })
    }

    async removeUser(query: Record<string, string | string[]>){
        return this.delete(this.addRemoveUserUrl, { data: query })
    }
}
