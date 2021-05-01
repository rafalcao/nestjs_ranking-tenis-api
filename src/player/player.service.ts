import { Injectable, Logger } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class PlayerService {

    /** array */
    private players: Player[] = [];

    /**
     * Logger
     */
    private readonly logger = new Logger(PlayerService.name);

    /**
     * @param playerModel 
     */
    constructor(@InjectModel('Player') private readonly playerModel: Model<Player>){}

    /**
     * @param playerObject 
     */
    async createOrUpdatePlayer(playerObject: CreatePlayerDto): Promise<string> {
        this.logger.log(`Received CreatePlayerObject: ${JSON.stringify(playerObject)}`)

        const { email } = playerObject
        const playerExists = await this.playerModel.findOne({email}).exec()

        if (!playerExists) {
            return await this.createPlayer(playerObject)
        }

        return await this.updatePlayer(playerObject)
    }

    /**
     * @returns Players[]
     */
    async getPlayer(email = null, id = null): Promise<Player[]>{

        if (email) {
            return this.getPlayerByEmail(email)
        }

        if (id) {
            return this.getPlayerById(id)
        }

        return this.getAllPlayers()   
    }

    /**
     * @returns Players[]
     */
    async getAllPlayers(): Promise<Player[]>{
        return await this.playerModel.find().exec()
    }

    /**
     * @param email 
     * @returns Players[]
     */
    async getPlayerByEmail(email): Promise<Player[]>{

        var playerExists = await this.playerModel.find({email}).exec()

        return playerExists;
    }

    /**
     * @param id 
     * @returns Players[]
     */
    async getPlayerById(id): Promise<Player[]>{

        var playerExists = await this.playerModel.find({id}).exec()

        return playerExists;
    }

    /**
     * 
     * @param email 
     * @param id 
     * @returns boolean
     */
    async deletePlayer(email = null, id = null): Promise<boolean>{
        
        try {
            let playerExists = null;

            if (email) {
                playerExists = await this.getPlayerByEmail(email)
            }

            if (!playerExists.length && id) {
                playerExists = await this.getPlayerById(id)
            }
            
            if (!playerExists.length) {
                return false;
            }

            await this.playerModel.deleteOne().exec();
        } catch (error) {
            return false
        }
        
        return true;
    }

    /**
     * @param createPlayerObject 
     */
    private async createPlayer(createPlayerObject: CreatePlayerDto): Promise<string> {
        
        const playerCreated = new this.playerModel(createPlayerObject)
        const player = await playerCreated.save()

        return player.id
    }

    /**
     * 
     * @param playerExists 
     * @param playerObject 
     * @returns string
     */
    private async updatePlayer(playerObject: CreatePlayerDto): Promise<string> {       
        const player = await this.playerModel.findOneAndUpdate(
            { email: playerObject.email }, 
            { $set: playerObject }
        ).exec()

        return player.id
    }
}
