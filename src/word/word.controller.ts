import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WordService } from './word.service';
import { LoginGuard } from 'src/auth/security/auth.guard';
import { Request } from 'express';
import { Payload } from 'src/auth/security/payload.interface';
import { CreateWordDTO, UpdateWordDTO } from './dto/word.dto';
import { WordListService } from './word-list.service';

@Controller('words')
export class WordController {
  constructor(
    private wordService: WordService,
    private wordListService: WordListService,
  ) {}
  private logger = new Logger('Words');

  // SECTION - Word List
  @Get()
  @UseGuards(LoginGuard)
  getOwnWordLists(@Req() req: Request) {
    const payload = req.user as Payload;
    return this.wordListService.getByUserId(payload.id);
  }

  @Get('/:id')
  @UseGuards(LoginGuard)
  async getWordList(@Param('id') id: number) {
    const wordList = await this.wordListService.findOne({ id });
    if (!wordList)
      throw new NotFoundException(`id가 ${id}인 단어장을 찾지 못 하였습니다`);
    return wordList;
  }

  @Post()
  @UseGuards(LoginGuard)
  async create(@Req() req: Request, @Body() dto: { name: string }) {
    if (!dto.name || dto.name.length == 0)
      throw new BadRequestException('단어장의 이름을 입력하세요');
    this.logger.log(`'${dto.name}' 단어장 생성`);
    const payload = req.user as Payload;
    return await this.wordListService.createNewList(payload.id, dto.name);
  }

  @Delete('/:id')
  @UseGuards(LoginGuard)
  async deleteList(@Param('id') id: number) {
    this.logger.log(`'id: ${id}' 단어장 삭제`);
    return await this.wordListService.delete(id);
  }
  // SECTION - Word
  @Post('/:listId')
  @UseGuards(LoginGuard)
  async insert(@Param('listId') listId: number, @Body() dto: CreateWordDTO) {
    if (!dto.english || !dto.korean) throw new BadRequestException('값 미충족');
    this.logger.log(`'id: ${listId}' <- '${dto.english}' 단어 추가`);
    return await this.wordService.customSave(listId, dto);
  }

  @Patch('/:listId/:wordId')
  @UseGuards(LoginGuard)
  async update(
    @Param('listId') listId: number,
    @Param('wordId') wordId: number,
    @Body() dto: UpdateWordDTO,
  ) {
    this.logger.log(`'id: ${listId}' <- '${dto.english}' 단어 수정`);
    return await this.wordListService.updateWordInList(listId, wordId, dto);
  }

  @Delete('/:listId/:wordId')
  @UseGuards(LoginGuard)
  async deleteWord(
    @Param('listId') listId: number,
    @Param('wordId') wordId: number,
  ) {
    this.logger.log(`'id: ${listId}' <- 'id: ${wordId}' 단어 삭제`);
    return await this.wordService.delete(wordId);
  }
}
