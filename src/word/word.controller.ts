import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { WordService } from './word.service';
import { LoginGuard } from 'src/auth/security/auth.guard';
import { Request } from 'express';
import { Payload } from 'src/auth/security/payload.interface';

@Controller('words')
export class WordController {
  constructor(private wordService: WordService) {}

  @Get()
  @UseGuards(LoginGuard)
  getOwnWords(@Req() req: Request) {
    const payload = req.user as Payload;
    return this.wordService.getByUserId(payload.id);
  }

  @Get()
  @UseGuards(LoginGuard)
  insert(@Req() req: Request) {}
}
