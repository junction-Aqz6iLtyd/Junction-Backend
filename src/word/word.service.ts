import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base.service';
import { Word } from './entity/word.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWordDTO } from './dto/word.dto';
import { voca_10000 } from 'src/quiz/config/voca_10000';

@Injectable()
export class WordService extends BaseService<Word> {
  constructor(@InjectRepository(Word) private repo: Repository<Word>) {
    super(repo);
  }

  findInVoca10000(english: string) {
    return voca_10000.filter((voc) => voc.word == english.toLowerCase());
  }

  getByWordListId(listId: number) {
    return this.find({ wordList: { id: listId } });
  }

  customSave(listId: number, dto: CreateWordDTO) {
    const vocaData = this.findInVoca10000(dto.english);
    return this.save({
      wordList: { id: listId },
      ...dto,
      example: vocaData.length > 0 ? vocaData[0].example.example_eng : '',
    });
  }
}
