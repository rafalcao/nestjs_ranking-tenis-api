import { Module } from '@nestjs/common';
import { PlayerModule } from './player/player.module';

@Module({
  imports: [PlayerModule],
  providers: [],
})
export class AppModule {}
