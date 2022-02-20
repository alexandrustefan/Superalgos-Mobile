//
// export class SaWebsocketClient {
//
//     socketClient: WebSocket
//
//     setup() {
//         this.socketClient = new WebSocket('ws://localhost:17042');
//         this.socketClient.onopen = () => { onConnection() }
//         this.socketClient.onerror = err => { onError(err) }
//
//         function onConnection() {
//             console.log("[INFO] Connected to socket server");
//
//         }
//
//         function onError(err) {
//             console.log('[ERROR] Web Sockets WebApp Client -> onError -> err.message = ' + err.message)
//             console.log('[ERROR] Web Sockets WebApp Client -> onError -> err.stack = ' + err.stack)
//         }
//     }
//
//     async sendGenericSocketMessage(message) {
//         let messageHeader
//         try {
//             messageHeader = JSON.parse(message)
//         } catch (err) {
//             let response = {
//                 result: 'Error',
//                 message: 'messageHeader Not Correct JSON Format.'
//             }
//             return JSON.stringify(response)
//         }
//
//         switch (messageHeader.networkService) {
//             case 'Social Graph': {
//                 const response = await DK.desktopApp.p2pNetworkClient.socialGraphNetworkServiceClient.sendMessage(messageHeader)
//                 return response
//             }
//             case 'Trading Signals': {
//                 break
//             }
//             default: {
//                 const response = {
//                     result: 'Error',
//                     message: 'networkService Not Supported.'
//                 }
//                 return JSON.stringify(response)
//             }
//         }
//     }
//
//     async getUserProfileInfo() {
//         return new Promise(getProfile);
//
//         function getProfile(resolve, reject) {
//
//         }
//     }
//     async createProfile(body, res) {
//
//         try {
//             let profileMessage = {
//                 profileType: SA.projects.socialTrading.globals.profileTypes.CREATE_USER_PROFILE,
//                 storageProviderName: "Github",
//                 storageProviderUsername: body.username,
//                 storageProviderToken: body.token,
//                 userAppType:"Social Trading Desktop App"
//             }
//
//             let query = {
//                 networkService: 'Social Graph',
//                 requestType: 'Profile',
//                 profileMessage: JSON.stringify(profileMessage)
//             }
//
//             return await webAppInterface.sendMessage(
//                 JSON.stringify(query)
//             )
//
//         } catch (error) {
//             console.log(error);
//         }
//     }
// }
//
