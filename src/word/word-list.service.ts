import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base.service';
import { Word } from './entity/word.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWordDTO } from './dto/word.dto';

@Injectable()
export class WordService extends BaseService<Word> {
  constructor(@InjectRepository(Word) private repo: Repository<Word>) {
    super(repo);
  }

  getByUserId(userId: number) {
    return this.find({ user: { id: userId } });
  }

  customSave(userId: number, dto: CreateWordDTO) {
    return this.save({
      user: { id: userId },
      ...dto,
    });
  }
}
