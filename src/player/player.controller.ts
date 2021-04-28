import { Body, Controller, Post } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto'
import { PlayerService } from './player.service';

@Controller('api/v1/player')
export class PlayerController {

    constructor(private readonly playerService: PlayerService) {}

    @Post()
    async createOrUpdate(
        @Body() createPlayerDtoParams: CreatePlayerDto
    ) {
        try {
            var playerId = await this.playerService.createOrUpdatePlayer(createPlayerDtoParams)
        } catch (error) {
            return JSON.stringify({
                'success': false,
                'message': 'Could not create player'
            })
        }

        return JSON.stringify({
            'success': true,
            'playerId': playerId
        })
    }
}
