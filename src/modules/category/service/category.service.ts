import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JogadoresService } from 'src/modules/jogadores/services';
import { badRequestException } from 'src/shared';

import { Category, CreateCategoryDto, UpdateCategoryDto } from '../models';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Categories') private readonly categoryModel: Model<Category>,
    private readonly jogadoresService: JogadoresService,
  ) {}

  private async findCategory(category: string) {
    return await this.categoryModel.findOne({ category }).exec();
  }

  //console.log('test')

  async createCategory(categoryData: CreateCategoryDto): Promise<Category> {
    const { category } = categoryData;
    const foundCategory = await this.findCategory(category);

    foundCategory && badRequestException('Essa categoria já existe!');
    return await this.categoryModel.create(categoryData);
  }

  async getCategories(): Promise<Category[]> {
    return await this.categoryModel.find().populate('players').exec();
  }

  async getCategoryByName(category: string): Promise<Category> {
    const foundCategory = await (
      await this.findCategory(category)
    ).populate('players');

    !foundCategory &&
      badRequestException(`Ops! A categoria ${category} não existe`);

    return foundCategory;
  }

  async updateCategoryByName(category: string, updateData: UpdateCategoryDto) {
    const foundCategory = await this.findCategory(category);

    !foundCategory &&
      badRequestException(`A categoria ${category} não foi encontrada`);

    return await this.categoryModel
      .findOneAndUpdate({ category }, { $set: updateData })
      .exec();
  }

  async getCategoryOfPlayer(idJogador: any): Promise<Category> {
    const jogadores = await this.jogadoresService.retornarJogadores();

    const jogadorFilter = jogadores.filter(
      (jogador) => jogador._id == idJogador,
    );

    jogadorFilter.length == 0 &&
      badRequestException(`O id ${idJogador} não é um jogador!`);

    return await this.categoryModel.findOne().where('players').in(idJogador);
  }

  async assingCategoryForPlayer(params: string[]): Promise<Category> {
    const category = params['categoria'];
    const _id = params['idJogador'];

    await this.jogadoresService.getPlayerById(_id);

    const foundCategory = await this.getCategoryByName(category);
    const foundPlayer = await this.categoryModel
      .find({ category })
      .where('players')
      .in(_id);

    foundPlayer.length > 0 &&
      badRequestException(
        `Ops! Jogador já cadastrado na categoria ${category}`,
      );

    foundCategory.players.push(_id);
    await this.categoryModel.findOneAndUpdate(
      { category },
      { $set: foundCategory },
    );

    return foundCategory;
  }
}
