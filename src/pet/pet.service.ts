import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base.service';
import { Pet } from './entity/pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PetService extends BaseService<Pet> {
  constructor(@InjectRepository(Pet) repo: Repository<Pet>) {
    super(repo);
  }

  getByUserId(userId: number) {
    return this.findOne({ user: { id: userId } });
  }
}
