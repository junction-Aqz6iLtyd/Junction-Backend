/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { DecoService } from './deco.service';
import { LoginGuard } from 'src/auth/security/auth.guard';
import { Request } from 'express';
import { Payload } from 'src/auth/security/payload.interface';

@Controller('decos')
export class DecoController {
  constructor(private decoService: DecoService) {}

  @Get()
  getAllDecos() {
    // TODO: 내가 가지고 있는거
    return this.decoService.find({});
  }

  @Get('buy')
  @UseGuards(LoginGuard)
  async buy(@Req() req: Request, @Query('decoId') decoId: number) {
    const payload = req.user as Payload;
    return await this.decoService.buyItem(payload.id, decoId);
  }

  @Get('init')
  init() {
    this.decoService.save({ id:1, itemId: 1, name: '여행가는 야옹이', price: 0, pets: [] });
    this.decoService.save({ id:2, itemId: 2, name: '집 가는 멍뭉이', price: 1000, pets: [] });
    this.decoService.save({ id:3, itemId: 3, name: '화난 햄찌', price: 1100, pets: [] });
  }
}
