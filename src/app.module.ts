import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { PlayerModule } from './player/player.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@cluster0.adu1m.mongodb.net/smartranking?retryWrites=true&w=majority',
      { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }
    ),
    PlayerModule
  ],
  providers: [],
})
export class AppModule {}
