import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GoalService } from './goal.service';
import { LoginGuard } from 'src/auth/security/auth.guard';
import { Request } from 'express';
import { Payload } from 'src/auth/security/payload.interface';

export interface GoalDTO {
  title: string;
  content: string;
  week: number[];
  isEveryday?: boolean;
}

@Controller('goals')
export class GoalController {
  constructor(private goalService: GoalService) {}

  @Get()
  @UseGuards(LoginGuard)
  async getOwn(@Req() req: Request) {
    const payload = req.user as Payload;
    return await this.goalService.find({ user: { id: payload.id } });
  }

  @Get(':id')
  async detail(@Param('id') id: number) {
    return await this.goalService.findOne({ id });
  }

  @Post()
  @UseGuards(LoginGuard)
  async create(@Req() req: Request, @Body() dto: GoalDTO) {
    const payload = req.user as Payload;
    return await this.goalService.save({ user: { id: payload.id }, ...dto });
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: GoalDTO) {
    const goal = await this.goalService.findOne({ id });
    if (!goal) throw new NotFoundException('No Goal');
    goal.title = dto.title;
    goal.content = dto.content;
    goal.week = dto.week;
    goal.isEveryday = dto.isEveryday ?? false;
    return await this.goalService.save(goal);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.goalService.delete(id);
  }
}
