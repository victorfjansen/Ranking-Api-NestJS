import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryService } from 'src/modules/category/service';
import { JogadoresService } from 'src/modules/jogadores/services';
import { badRequestException, notFoundException } from 'src/shared';

import {
  AssignChallengeToMatchDto,
  Challenge,
  ChallengeStatusEnum,
  createChallengeDto,
  Match,
  UpdateChallengeDto,
} from '../models';

@Injectable()
export class ChallengeService {
  constructor(
    @InjectModel('Challenge') private readonly challengeModel: Model<Challenge>,
    @InjectModel('Match') private readonly matchModel: Model<Match>,
    private readonly jogadoresService: JogadoresService,
    private readonly categoryService: CategoryService,
  ) {}

  async getAllChallenges(): Promise<Challenge[]> {
    return await this.challengeModel
      .find()
      .populate('players')
      .populate('requester')
      .populate('match');
  }

  async getChallengesOfPlayerById(_id: any) {
    return await this.challengeModel
      .find()
      .where('players')
      .in(_id)
      .populate('requester')
      .populate('players')
      .populate('match');
  }

  async createChallenge(createChallengeDto: createChallengeDto): Promise<any> {
    const players = await this.jogadoresService.retornarJogadores();

    createChallengeDto.players.map((playerDto) => {
      const playerFilter = players.filter(
        (player) => player.id == playerDto._id,
      );

      playerFilter.length == 0 &&
        badRequestException(`O id ${playerDto._id} não é válido!`);
    });

    const requesterIsParticipantOfMatch =
      await createChallengeDto.players.filter(
        (player) => player._id == createChallengeDto.requester,
      );

    requesterIsParticipantOfMatch.length < 1 &&
      badRequestException(
        'O jogador que tentou criar a partida não faz parte dela!',
      );

    const categoryOfPlayer = await this.categoryService.getCategoryOfPlayer(
      createChallengeDto.requester,
    );

    !categoryOfPlayer &&
      badRequestException(
        'O solicitante precisa estar registrado em uma categoria!',
      );

    const createdChallenge = {
      ...createChallengeDto,
      category: categoryOfPlayer.category,
      dateHourSolicitation: new Date(),
      status: ChallengeStatusEnum.PENDENTE,
    };

    console.log(createdChallenge);
    return await this.challengeModel.create(createdChallenge);
  }

  async updateChallenge(
    _id: string,
    updateChallengeDto: UpdateChallengeDto,
  ): Promise<void> {
    const foundChallenge = await this.challengeModel.findById(_id);

    !foundChallenge && notFoundException(`Desafio ${_id} não cadastrado!`);

    if (updateChallengeDto.status) {
      foundChallenge.dateHourResponse = new Date();
    }
    foundChallenge.status = updateChallengeDto.status;
    foundChallenge.dateHourChallenge = updateChallengeDto.dateHourChallenge;

    await this.challengeModel.findOneAndUpdate(
      { _id },
      { $set: foundChallenge },
    );
  }

  async assignChallengeToMatch(
    _id: string,
    assignChallengeToMatchDto: AssignChallengeToMatchDto,
  ): Promise<Match> {
    const foundChallenge = await this.challengeModel.findById({ _id });
    !foundChallenge && badRequestException(`Desafio ${_id} não encontrado!`);

    const playerFilter = foundChallenge.players.filter(
      (player) => player._id == assignChallengeToMatchDto.def._id,
    );

    playerFilter.length == 0 &&
      badRequestException('O Jogador vencedor não faz parte do desafio!');

    const createdMatch = await this.matchModel.create({
      category: foundChallenge.category,
      players: foundChallenge.players,
    });

    foundChallenge.status = ChallengeStatusEnum.REALIZADO;
    foundChallenge.match = createdMatch._id;

    try {
      await this.challengeModel.findOneAndUpdate(
        { _id },
        { $set: foundChallenge },
      );
    } catch (e) {
      await this.matchModel.findOneAndDelete({ _id: createdMatch._id });
      throw new InternalServerErrorException();
    }

    return createdMatch;
  }

  async deleteChallenge(_id: string): Promise<void> {
    const foundChallenge = await this.challengeModel.findById({ _id });

    !foundChallenge && badRequestException(`Desafio ${_id} não encontrado!`);

    foundChallenge.status = ChallengeStatusEnum.CANCELADO;

    await this.challengeModel.findOneAndUpdate(
      { _id },
      { $set: foundChallenge },
    );
  }
}
