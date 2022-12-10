
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

export interface ChatUserInterface  {
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
