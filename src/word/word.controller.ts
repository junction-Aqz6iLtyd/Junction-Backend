import {
  Body,
  Controller,
  Delete,
  Get,
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

@Controller('words')
export class WordController {
  constructor(private wordService: WordService) {}

  @Get()
  @UseGuards(LoginGuard)
  getOwnWords(@Req() req: Request) {
    const payload = req.user as Payload;
    return this.wordService.getByUserId(payload.id);
  }

  @Post()
  @UseGuards(LoginGuard)
  async insert(@Req() req: Request, @Body() dto: CreateWordDTO) {
    const payload = req.user as Payload;
    return await this.wordService.customSave(payload.id, dto);
  }

  @Patch(':id')
  @UseGuards(LoginGuard)
  async update(@Param('id') id: number, @Body() dto: UpdateWordDTO) {
    return await this.wordService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(LoginGuard)
  async delete(@Param('id') id: number) {
    return await this.wordService.delete(id);
  }
}
