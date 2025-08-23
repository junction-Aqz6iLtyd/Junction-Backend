import { Injectable } from '@nestjs/common';
import { Deco } from './entity/deco.entity';
import { BaseService } from 'src/common/base.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DecoService extends BaseService<Deco> {
  constructor(@InjectRepository(Deco) repo: Repository<Deco>) {
    super(repo);
  }
}
