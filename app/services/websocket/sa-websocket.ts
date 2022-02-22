import {genereteUniqueId} from "../../utils/misc";
import {UserProfile} from "../../models";
import {getSnapshot} from "mobx-state-tree";
import {ProfileTypes} from "../../models/profile-types";

export class SaWebsocketClient {

    socketClient: WebSocket

    onMessageFunctionsMap = new Map()

    async setup() {
        if (this.socketClient == null) {
            return new Promise<void>((resolve, reject) => {
                this.socketClient = new WebSocket('ws://localhost:17042');
                this.socketClient.onopen = () => {
                    onConnection()
                }
                this.socketClient.onerror = err => {
                    onError(err)
                }

                const onConnection = () => {
                    this.socketClient.onmessage = socketMessage => {
                        this.onMessage(socketMessage)
                    }
                    console.log("[INFO] Connected to socket server");
                    resolve()
                }

                function onError(err) {
                    console.log('[ERROR] Web Sockets WebApp Client -> onError -> err.message = ' + err.message)
                    console.log('[ERROR] Web Sockets WebApp Client -> onError -> err.stack = ' + err.stack)
                    // TODO: Add reject to be able to do something with it at UI level
                }
            })
        }
    }

    close() {
        this.socketClient.close();
        this.socketClient = null;
    }

    async sendGenericSocketMessage(message) {
        return new Promise<void>((resolve, reject) => {
            if (this.socketClient.readyState !== 1) { // 1 means connected and ready.
                console.log('[ERROR] Web Sockets WebApp Client -> sendMessage -> Cannot send message while connection is closed.')
                reject(new Error('Websockets Connection Not Ready.'));
                return
            }

            const socketMessage = {
                messageId: genereteUniqueId(),
                messageType: 'Request',
                payload: message
            }
            this.onMessageFunctionsMap.set(socketMessage.messageId, onMessageFunc)
            console.log("[INFO] Sending message to websocket server", JSON.stringify(message));
            this.socketClient.send(
                JSON.stringify(socketMessage)
            )

            resolve()

            function onMessageFunc(response) {
                try {
                    if (response.result === 'Ok') {
                        console.log("[INFO] Received response", JSON.stringify(message))
                        resolve(response.data)
                    } else {
                        console.log('[ERROR] Web Sockets WebApp Client -> onMessage -> response.message = ' + response.message)
                        reject(response.message)
                    }

                } catch (err) {
                    console.log('[ERROR] Web Sockets WebApp Client -> err.stack = ' + err.stack)
                }
            }
        })

    }

    onMessage(socketMessage) {

        const message = JSON.parse(socketMessage.data)
        console.log("[INFO] Received socket message", JSON.stringify(socketMessage))
        /*
        We get the function that is going to resolve or reject the promise given.
        */
        const onMessageFunction = this.onMessageFunctionsMap.get(message.messageId)
        this.onMessageFunctionsMap.delete(message.messageId)

        if (this.onMessageFunctionsMap !== undefined) {
            /*
            The message received is a response to a message sent.
            */
            onMessageFunction(message)
        } else {
            /*
            The message received is a not response to a message sent.
            That means that is an event received from the Client App.
            */
            try {
                console.log(JSON.parse(message))
                event = JSON.parse(message)
            } catch (err) {
                console.log('[ERROR] Web Sockets WebApp Client -> onMenssage -> message = ' + message)
                console.log('[ERROR] Web Sockets WebApp Client -> onMenssage -> err.stack = ' + err.stack)
                this.close()
            }

            // TODO: Do something with the response received
        }
    }

    async createSocialEntity(socialHandle: string) {
        try {
            const profileMessage = {
                profileType: ProfileTypes.CREATE_SOCIAL_ENTITY,
                socialEntityHandle: socialHandle,
                socialEntityType: "Social Persona",
                userAppType: "Social Trading Desktop App"
            }

            const query = {
                networkService: 'Social Graph',
                requestType: 'Profile',
                profileMessage: JSON.stringify(profileMessage)
            }

            return await this.sendGenericSocketMessage(
                JSON.stringify(query)
            )
        } catch (error) {
            console.log(error);
        }
    }

    async createProfile(userProfile: UserProfile) {

        try {
            const profileMessage = JSON.stringify(getSnapshot(userProfile))


            const query = {
                networkService: 'Social Graph',
                requestType: 'Profile',
                profileMessage: profileMessage
            }

            return await this.sendGenericSocketMessage(
                JSON.stringify(query)
            )

        } catch (error) {
            console.log(error);
        }
    }
}

