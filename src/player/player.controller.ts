import { Body, Controller, Delete, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto'
import { PlayerService } from './player.service';
import { Player } from './interfaces/player.interface'
import { PlayerParametersValidationPipe } from  './pipes/player-parameters-validation.pipe'


@Controller('api/v1/player')
export class PlayerController {

    /**
     * @param playerService 
     */
    constructor(private readonly playerService: PlayerService) {}

    /**
     * @param createPlayerDtoParams 
     * @returns string
     */
    @Post()
    @UsePipes(ValidationPipe)
    async createOrUpdate(
        @Body() createPlayerDtoParams: CreatePlayerDto
    ) {
        try {
            var playerId = await this.playerService.createOrUpdatePlayer(createPlayerDtoParams)
        } catch (error) {
            return JSON.stringify({
                'success': false,
                'message': `Could not create player, because: ${error}`
            })
        }

        return JSON.stringify({
            'success': true,
            'playerId': playerId
        })
    }

    @Get('/all')
    async getAllPlayers(): Promise<Player[]> {
        return this.playerService.getPlayer();
    }

    @Get()
    async getPlayer(
        @Query('email', PlayerParametersValidationPipe) email: string,
        @Query('id') id: string
    ): Promise<Player[]> {
        return this.playerService.getPlayer(email, id);
    }

    @Delete()
    async deletePlayer(
        @Query('email', PlayerParametersValidationPipe) email: string,
        @Query('id') id: string
    ): Promise<boolean> {
        return await this.playerService.deletePlayer(email, id);
    }
}
