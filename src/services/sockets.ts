import { mensajes } from "../models/messagesModels";
import { Server } from "socket.io";
import { addMessages, getMessages } from "../models/messagesNormalize";




export const initWsServer = (app : any) => {
    const myWSServer = new Server(app);


    myWSServer.on('connection', function (socket : any) {
        console.log('\n\nUn cliente se ha conectado');
        console.log(`ID DEL SOCKET DEL CLIENTE => ${socket.client.id}`);
        console.log(`ID DEL SOCKET DEL SERVER => ${socket.id}`);

        socket.on('askData', async () => {
            console.log('ME LLEGO DATA');
            const messages = await getMessages();
            console.log('OPS', messages);
            socket.emit('messages', messages);
        });

        socket.on('new-message', async (data : any) => {
            console.log('data',data);
            const newMsg = await addMessages(data);
            console.log('newmsg',newMsg);
            myWSServer.emit('messages', [newMsg]);
          });
        
    })

    
    
    return myWSServer;
}

