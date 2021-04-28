import { Injectable, Logger } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class PlayerService {

    /** array */
    private players: Player[] = [];

    /**
     * Logger
     */
    private readonly logger = new Logger(PlayerService.name);

    /**
     * @param playerObject 
     */
    async createOrUpdatePlayer(playerObject: CreatePlayerDto): Promise<string> {
        this.logger.log(`Received CreatePlayerObject: ${JSON.stringify(playerObject)}`)

        const { email } = playerObject

        const playerExists = await this.players.find(player => player.email === email)

        if (!playerExists) {
            return this.createPlayer(playerObject);
        }

        return this.updatePlayer(playerExists, playerObject)
    }

    /**
     * @returns Players[]
     */
    async getPlayer(email = null, id = null): Promise<Player[]>{

        if (email) {
            return this.getPlayerByEmail(email);
        }

        if (id) {
            return this.getPlayerById(id);
        }

        return this.getAllPlayers();        
    }

    /**
     * @returns Players[]
     */
    async getAllPlayers(): Promise<Player[]>{
        return await this.players; 
    }

    /**
     * @param email 
     * @returns Players[]
     */
    async getPlayerByEmail(email): Promise<Player[]>{

        var playerExists = this.players.find(player => player.email === email)

        return [playerExists];
    }

    /**
     * @param id 
     * @returns Players[]
     */
    async getPlayerById(id): Promise<Player[]>{

        var playerExists = this.players.find(player => player._id === id)

        return [playerExists];
    }

    /**
     * 
     * @param email 
     * @param id 
     * @returns boolean
     */
    async deletePlayer(email = null, id = null): Promise<boolean>{

        if (email) {
            var playerExists = this.players.find(player => player.email === email)
        }

        if (id) {
            var playerExists = this.players.find(player => player._id === id)
        }

        if (!playerExists) {
            return false;
        }

        await this.deleteExistsPlayer(playerExists);
        
        return true;
    }

    /**
     * @param playerExists 
     */
    private async deleteExistsPlayer(playerExists: Player): Promise<void> {
        this.players = this.players.filter(player => player._id !== playerExists._id)
    }

    /**
     * @param createPlayerObject 
     */
    private createPlayer(createPlayerObject: CreatePlayerDto): string {
        const { name, phoneNumber, email } = createPlayerObject;
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

    /**
     * 
     * @param playerExists 
     * @param playerObject 
     * @returns string
     */
    private updatePlayer(playerExists: Player, playerObject: CreatePlayerDto): string {
        const { name, phoneNumber } = playerObject;

        playerExists.name = name;
        playerExists.phoneNumber = phoneNumber;
        
        return playerExists._id
    }
}
