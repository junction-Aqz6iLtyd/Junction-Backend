import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Deco } from './entity/deco.entity';
import { BaseService } from 'src/common/base.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/auth/user.service';
import { PetService } from 'src/pet/pet.service';

@Injectable()
export class DecoService extends BaseService<Deco> {
  constructor(
    @InjectRepository(Deco) repo: Repository<Deco>,
    private userService: UserService,
    private petService: PetService,
  ) {
    super(repo);
  }

  async buyItem(userId: number, decoId: number) {
    const user = await this.userService.getById(userId);
    const deco = await this.findOne({ id: decoId });
    if (!decoId || !deco)
      throw new NotFoundException('해당하는 장식품을 찾을 수 없습니다');
    if (user.point < deco.price)
      throw new BadRequestException('가지고 있는 포인트가 부족합니다');
    const pet = await this.petService.findOne({ user: { id: userId } });
    if (!pet) throw new NotFoundException('no pet');
    // 구매 완료 처리
    pet.decos.push(deco);
    await this.petService.save(pet);
    user.point -= deco.price;
    await this.userService.save(user);

    return pet;
  }
}
