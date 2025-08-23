import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { Payload } from './security/payload.interface';
import { BaseService } from 'src/common/base.service';
import { PetService } from 'src/pet/pet.service';
import { GoalService } from 'src/goal/goal.service';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private petService: PetService,
    private goalService: GoalService,
  ) {
    super(userRepo, ['goal']);
  }

  async findByPayload(payload: Payload) {
    return await this.findOne({ id: payload.id });
  }

  async getById(id: number): Promise<User> {
    const user = await this.findOne({ id });
    if (!user) {
      throw new NotFoundException('해당 ID를 가진 유저를 찾지 못하였습니다.');
    }
    return user;
  }

  /** Include encrypting password */
  async create(createDto: CreateUserDTO): Promise<User> {
    await this.encryptPassword(createDto);
    const user = await this.userRepo.save(createDto);
    await this.petService.save({ user: { id: user.id } });
    await this.goalService.createEmpty(user.id);
    return user;
  }

  //SECTION - crpyto
  async encryptPassword(userDto: CreateUserDTO) {
    userDto.password = await this.encrypt(userDto.password);
  }

  async encrypt(data: string) {
    return await bcrypt.hash(data, 10);
  }

  async comparePassword(password: string, user: User) {
    return await bcrypt.compare(password, user.password);
  }
}
