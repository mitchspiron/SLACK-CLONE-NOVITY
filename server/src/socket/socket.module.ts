import { Module } from '@nestjs/common';
import { MessageSocket } from './message.socket';

@Module({
  providers: [MessageSocket],
})
export class SocketModule {}
