import { HTTPTransport } from "./HTTPTransport";


export interface ChatListMessageInterface {
        id: number,
        title: string,
        avatar: any | null,
        created_by: number,
        unread_count: number,
        last_message: any | null
}

export class ChatAPI extends HTTPTransport{
    public chatListUrl = '/chats'
    public chatTokenUrl = '/chats/token/'
    public createChatUrl = '/chats'
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
        return this.post(this.createChatUrl, { 'title': `${title}`})
    }

    async deleteChat(chatId:string){
        return this.delete(this.createChatUrl, { 'chatId': `${chatId}`})
    }
}
