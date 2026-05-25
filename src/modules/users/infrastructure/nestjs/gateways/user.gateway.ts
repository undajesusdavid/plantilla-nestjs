import { 
  WebSocketGateway, 
  WebSocketServer, 
  SubscribeMessage, 
  MessageBody, 
  ConnectedSocket 
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Inject } from '@nestjs/common';
import { COMMAND_BUS } from '@src/shared/app/bus/command-bus';
import { NestCommandBus } from '@shared/infrastructure/framework/nest/module/bus/nest-command-bus';
import { OnEvent } from '@nestjs/event-emitter';
import { AuthUserEvent } from '@modules/users/app/auth-user/auth-user.event';
// Puedes definir el puerto o dejar que use el mismo servidor HTTP
@WebSocketGateway({
  cors: { origin: '*' }, // Configura el CORS según tus necesidades
  namespace: 'users'     // Aísla los eventos de usuarios en su propio canal
})
export class UserGateway {
  @WebSocketServer()
  server!: Server;

  constructor(
    @Inject(COMMAND_BUS) private readonly commandBus: NestCommandBus
  ) {}


  @OnEvent('auth-user') // Escucha el evento 'auth-user' que emitimos desde el bus de eventos
  handleAuthUserEvent(event: AuthUserEvent) {
    console.log(`Retransmitiendo AuthUserEvent vía WS en namespace 'users' para: ${event.username}`);

    // Emitimos a todos los clientes que estén conectados al namespace 'users'
    this.server.emit('user-authenticated', {
      userId: event.userId,
      username: event.username,
      occurredAt: event.occurredAt
    });
  }


  // 1. Escuchar cuando un cliente se conecta
  handleConnection(client: Socket) {
    console.log(`Cliente conectado a usuarios: ${client.id}`);
  }

  // 2. Escuchar cuando un cliente se desconecta
  handleDisconnect(client: Socket) {
    console.log(`Cliente desconectado: ${client.id}`);
  }

  // 3. Escuchar un evento específico enviado por el cliente
  @SubscribeMessage('update-user-status')
  async handleUpdateStatus(
    @MessageBody() data: { userId: string; status: string },
    @ConnectedSocket() client: Socket
  ) {
    try {
      // Convertimos el evento en un comando de nuestro negocio
      // const command = new UpdateUserStatusCommand(data.userId, data.status);
      // await this.commandBus.execute(command);

      // Responder de vuelta al cliente que originó la petición
      client.emit('status-updated-success', { success: true });

      // O notificar a todos los demás usuarios conectados en el namespace:
      this.server.emit('user-status-changed', { userId: data.userId, status: data.status });
    } catch (error) {
      client.emit('exception', { message: 'Error procesando el evento' });
    }
  }
}