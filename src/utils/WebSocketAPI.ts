export class WebSocketAPI {
    public baseUrl = 'wss://ya-praktikum.tech/ws/chats'
    public socket: WebSocket;
    public socketPingInterval = 10000;
    public socketWaitForReadyStateInterval = 500;
    public socketRetriesCount = 5;

    constructor(public userId: number | string, public chatId: number | string, public token: number | string) {
        this.socket = new WebSocket(`${this.baseUrl}/${this.userId}/${this.chatId}/${this.token}`);
        // error
        this.socket.addEventListener('error', event => {
            // debug
            console.log('Ошибка', event.message);
        });
        // close
        this.socket.addEventListener('close', event => {
            if (event.wasClean) {
                console.log('Соединение закрыто чисто');
            } else {
                console.log('Обрыв соединения');
            }
            // debug
            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        });
    }

    // keep socket alive
    public keepAlive() {
        setInterval(() => {
            // debug
            console.log('ping...')
            //
            this.socket.addEventListener('open', () => {
                this.socket.send(JSON.stringify({
                    content: '',
                    type: 'message',
                }));
            });
        }, this.socketPingInterval);
    }

    async getOldChatMessages(skip: number | string = 0) {
        return new Promise((resolve, reject) => {
            const getOldMessages = () => {
                this.socket.send(JSON.stringify({
                    content: skip,
                    type: 'get old',
                }));
            }
            if (this.socket.readyState === 1) {
                getOldMessages()
            } else {
                //
                //console.log('Socket not in ready state')            
                setTimeout(() => {
                    if (this.socket.readyState === 1) {
                        getOldMessages();
                    }
                }, this.socketWaitForReadyStateInterval);

            }
            // new incoming message 
            this.socket.addEventListener('message', event => {
                resolve(JSON.parse(event.data))
            });

        })
    }

    public close(): void {
        this.socket.close();
    }

    temp() {
        socket.addEventListener('open', () => {
            console.log('Соединение установлено');

            socket.send(JSON.stringify({
                content: 'Моё второе сообщение миру!',
                type: 'message',
            }));
        });

    }
}
