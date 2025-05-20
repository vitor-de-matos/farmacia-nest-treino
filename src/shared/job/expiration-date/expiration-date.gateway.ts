import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Lote } from 'src/batch/models/entity/batch.entity';

@WebSocketGateway({ cors: true })
export class GatewayService {
  @WebSocketServer()
  server: Server;

  emitirVencimentos(lotes: Lote[]) {
    this.server.emit('lotesVencendo', lotes);
  }
}
