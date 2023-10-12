import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'ws';

@WebSocketGateway(8080, { cors: { origin: '*', } })
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    handleConnection(client: any) {
        client.on('message', (data: any) => {
            console.log(`received: ${data}`);
            client.send(`${data}`);
        });

        console.log('handleConnection', this.server.clients.size);
    }

    handleDisconnect(client: any) {
        console.log('handleDisconnect', this.server.clients.size);
    }

}
