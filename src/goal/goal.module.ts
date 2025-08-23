import { Module } from '@nestjs/common';
import { GoalService } from './goal.service';
import { Goal } from './entity/goal.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoalController } from './goal.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Goal])],
  providers: [GoalService],
  controllers: [GoalController],
})
export class GoalModule {}
