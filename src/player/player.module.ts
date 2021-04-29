import { Module } from '@nestjs/common';
import { PlayerController } from './player.controller'
import { PlayerService } from './player.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerSchema } from './interfaces/player.schema';

@Module({
  imports: [ 
    MongooseModule.forFeature(
      [{name: 'Player', schema: PlayerSchema}]
    )
  ],
  controllers: [PlayerController],
  providers: [PlayerService]
})
export class PlayerModule {}
