import { Injectable, Logger } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class PlayerService {

    private players: Player[] = [];

    private readonly logger = new Logger(PlayerService.name);

    /**
     * @param createPlayerObject 
     */
    async createOrUpdatePlayer(createPlayerObject: CreatePlayerDto): Promise<string> {
        this.logger.log(`Received CreatePlayerObject: ${JSON.stringify(createPlayerObject)}`)
        return this.createPlayer(createPlayerObject);
    }

    /**
     * @param createPlayerObject 
     */
    private createPlayer(createPlayerObject: CreatePlayerDto): string {
        const {name, phoneNumber, email} = createPlayerObject;
        var playerId = uuidv4();
        const player: Player = {
            _id: playerId,
            name,
            phoneNumber,
            email,
            ranking: 'A',
            rankingPosition: 1,
            picture: 'www.google.com/picture.jpg'
        }

        this.logger.log(`Player Object will be saved: ${JSON.stringify(player)}`)

        this.players.push(player);

        return playerId;
    }

}
