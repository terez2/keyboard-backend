import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { map, tap } from 'rxjs';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  allowEIO3: true,
})
export class AppGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private readonly app: AppService) {}

  private logger: Logger = new Logger('websocket');

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): any {
    this.logger.log('Message received', message);
    this.server.emit('message', message);
    return this.app.message$.pipe(
      map((message) => ({ event: 'message', data: message })),
    );
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.server.emit('message', 'Login');
    this.logger.log(
      `Client connected: ${client.id} ${JSON.stringify(client.rooms)}`,
    );
    const clientRoom = 'socket#' + client.id;
    client.join(clientRoom);

     // todo: unsubscribe on connection drop
    this.app.message$.pipe(tap((data) => this.logger.log)).subscribe((data) => {
      this.server.to(clientRoom).emit('message', data);
    });
  }
}
