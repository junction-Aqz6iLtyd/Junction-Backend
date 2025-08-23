import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base.service';
import { Pet } from './entity/pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PetService extends BaseService<Pet> {
  constructor(@InjectRepository(Pet) private repo: Repository<Pet>) {
    super(repo, ['decos']);
  }

  async getByUserId(userId: number) {
    const pet = await this.findOne({ user: { id: userId } });
    return pet;
  }

  async selectDeco(userId: number, decoId: number) {
    const pet = await this.findOne({ user: { id: userId } });
    if (!pet) throw new BadRequestException('No pet');
    if (!pet.decos.some((deco) => deco.id === decoId))
      throw new BadRequestException('해당 장식품을 가지고 있지 않습니다');
    pet.selectedDecoId = decoId;
    return this.save(pet);
  }
}
