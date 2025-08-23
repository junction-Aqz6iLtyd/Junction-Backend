import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GoalService } from './goal.service';
import { LoginGuard } from 'src/auth/security/auth.guard';
import { Request } from 'express';
import { Payload } from 'src/auth/security/payload.interface';

@Controller('goal')
export class GoalController {
  constructor(private goalService: GoalService) {}

  @Get()
  @UseGuards(LoginGuard)
  async getOwnGoal(@Req() req: Request) {
    const payload = req.user as Payload;
    const goal = await this.goalService.findOne({ user: { id: payload.id } });
    if (!goal) return await this.goalService.createEmpty(payload.id);
    return goal;
  }
}
