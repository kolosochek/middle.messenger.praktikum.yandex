import { HTTPTransport } from "./HTTPTransport";

interface ChatListInterface {

}

export class ChatAPI extends HTTPTransport{
    public chatListUrl = '/chats'
    async getChatList(){
        this.get(this.chatListUrl)
    }
}
