import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base.service';
import { Goal } from './entity/goal.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GoalService extends BaseService<Goal> {
  constructor(@InjectRepository(Goal) repo: Repository<Goal>) {
    super(repo);
  }

  createEmpty(userId: number) {
    return this.save({
      user: { id: userId },
      title: '',
      content: '',
    });
  }
}
