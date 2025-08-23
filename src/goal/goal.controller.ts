import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GoalService } from './goal.service';
import { LoginGuard } from 'src/auth/security/auth.guard';
import { Request } from 'express';
import { Payload } from 'src/auth/security/payload.interface';

export interface UpdateGoalDTO {
  title: string;
  content: string;
  week: number[];
}

@Controller('goal')
export class GoalController {
  constructor(private goalService: GoalService) {}

  @Get()
  @UseGuards(LoginGuard)
  async getOwn(@Req() req: Request) {
    const payload = req.user as Payload;
    const goal = await this.goalService.findOne({ user: { id: payload.id } });
    if (!goal) return await this.goalService.createEmpty(payload.id);
    return goal;
  }

  @Patch()
  @UseGuards(LoginGuard)
  async update(@Req() req: Request, @Body() dto: UpdateGoalDTO) {
    const payload = req.user as Payload;
    const goal = await this.goalService.findOne({ user: { id: payload.id } });
    if (!goal) throw new NotFoundException('No Goal');
    goal.title = dto.title;
    goal.content = dto.content;
    goal.week = dto.week;
    return await this.goalService.save(goal);
  }
}
