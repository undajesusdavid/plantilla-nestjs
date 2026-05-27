import { OnEvent } from '@nestjs/event-emitter';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { configGateway } from '@src/shared/infrastructure/framework/nest/gateway/config-gateway';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  ...configGateway,
  namespace: 'users'
})
export class UserGateway {
  @WebSocketServer()
  private readonly server!: Server;

  constructor() { }

  // El Gateway escucha el evento del Caso de Uso
  @OnEvent('auth-user')
  handleUserAuthenticatedEvent(payload: { userId: string; username: string; occurredAt: Date }) {
    console.log(`[Gateway] Evento interno recibido. Retransmitiendo vía WebSocket a /users...`);

    // Transmisión masiva (Broadcasting) al frontend en React
    this.server.emit('user-authenticated', {
      occurredAt: payload.occurredAt,
      userId: payload.userId,
      username: payload.username,
    });
  }

}