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

  getByWordListId(listId: number) {
    return this.find({ wordList: { id: listId } });
  }

  customSave(listId: number, dto: CreateWordDTO) {
    return this.save({
      wordList: { id: listId },
      ...dto,
    });
  }
}
