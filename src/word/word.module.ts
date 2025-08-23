import { Module } from '@nestjs/common';
import { WordService } from './word.service';
import { WordController } from './word.controller';
import { Word } from './entity/word.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordList } from './entity/word-list.entity';
import { WordListService } from './word-list.service';

@Module({
  imports: [TypeOrmModule.forFeature([Word, WordList])],
  providers: [WordService, WordListService],
  controllers: [WordController],
})
export class WordModule {}
