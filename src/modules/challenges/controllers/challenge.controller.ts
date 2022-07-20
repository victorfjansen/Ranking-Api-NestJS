import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import {
  AssignChallengeToMatchDto,
  Challenge,
  createChallengeDto,
  Match,
  UpdateChallengeDto,
} from '../models';
import { ChallengeService } from '../services';

@Controller('api/v1/challenges')
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {}

  @Get()
  async getChallenges(@Query('idJogador') _id: string): Promise<Challenge[]> {
    return _id
      ? await this.challengeService.getChallengesOfPlayerById(_id)
      : await this.challengeService.getAllChallenges();
  }

  @Post('create-challenge')
  @UsePipes(ValidationPipe)
  async createChallenge(
    @Body() createChallengeData: createChallengeDto,
  ): Promise<any> {
    return await this.challengeService.createChallenge(createChallengeData);
  }

  @Post('/:desafio/partida/')
  async assignChallengeToMatch(
    @Body(ValidationPipe) assignChallengeToMatchDto: AssignChallengeToMatchDto,
    @Param('desafio') challengeId: string,
  ): Promise<Match> {
    return await this.challengeService.assignChallengeToMatch(
      challengeId,
      assignChallengeToMatchDto,
    );
  }

  @Put(':/desafio')
  async updateChallenge(
    @Param('desafio') challengeID: string,
    @Body() updateChallengeDto: UpdateChallengeDto,
  ) {
    await this.challengeService.updateChallenge(
      challengeID,
      updateChallengeDto,
    );
  }
}
