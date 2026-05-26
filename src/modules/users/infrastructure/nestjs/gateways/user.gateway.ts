import { 
  WebSocketGateway, 
  WebSocketServer, 
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Inject } from '@nestjs/common';
import { COMMAND_BUS } from '@src/shared/app/bus/command-bus';
import { NestCommandBus } from '@shared/infrastructure/framework/nest/module/bus/nest-command-bus';

@WebSocketGateway({
  cors: { origin: '*' }, 
  namespace: 'users'    
})
export class UserGateway {
  @WebSocketServer()
  private readonly server!: Server;

  constructor(
    @Inject(COMMAND_BUS) private readonly commandBus: NestCommandBus
  ) {}


  // 1. Escuchar cuando un cliente se conecta
  handleConnection(client: Socket) {
    console.log(`Cliente conectado a usuarios: ${client.id}`);
  }

  // 2. Escuchar cuando un cliente se desconecta
  handleDisconnect(client: Socket) {
    console.log(`Cliente desconectado: ${client.id}`);
  }

}