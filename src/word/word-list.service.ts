import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from 'src/common/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WordList } from './entity/word-list.entity';
import { UpdateWordDTO } from './dto/word.dto';
import { WordService } from './word.service';
import { Word } from './entity/word.entity';

@Injectable()
export class WordListService extends BaseService<WordList> {
  constructor(
    @InjectRepository(WordList) private repo: Repository<WordList>,
    private wordService: WordService,
  ) {
    super(repo, ['words']);
  }

  getByUserId(userId: number) {
    return this.find({ user: { id: userId } });
  }

  createNewList(userId: number, name: string) {
    return this.save({
      user: { id: userId },
      name,
      words: [],
    });
  }

  async updateWordInList(listId: number, wordId: number, dto: UpdateWordDTO) {
    const wordList = await this.findOne({ id: listId });
    if (!wordList)
      throw new NotFoundException('해당하는 단어장이 존재하지 않습니다');
    let complete: Word | null = null;
    wordList.words.forEach((word) => {
      if (word.id == wordId) {
        word.english = dto.english ?? word.english;
        word.korean = dto.korean ?? word.korean;
        complete = word;
      }
    });
    if (complete) return await this.wordService.save(complete);
    else
      throw new NotFoundException(
        `'${wordList.name}'에는 id가 ${wordId}인 단어가 존재하지 않습니다`,
      );
  }
}
