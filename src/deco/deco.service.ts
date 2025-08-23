import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Deco, DecoType } from './entity/deco.entity';
import { BaseService } from 'src/common/base.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/auth/user.service';
import { PetService } from 'src/pet/pet.service';

export interface ShopItem {
  id: number;
  decoType: DecoType;
  itemId: number;
  name: string;
  price: number;
  hasDeco: boolean;
}

@Injectable()
export class DecoService extends BaseService<Deco> {
  constructor(
    @InjectRepository(Deco) private repo: Repository<Deco>,
    private userService: UserService,
    @Inject(forwardRef(() => PetService)) private petService: PetService,
  ) {
    super(repo);
  }

  async findWithStatus(userId: number) {
    const decos = await this.find({});
    const pet = await this.petService.getByUserId(userId);
    const items: ShopItem[] = [];
    decos.forEach((deco) => {
      items.push({
        ...deco,
        hasDeco: pet?.decos.some((own) => own.id == deco.id) ?? false,
      });
    });
    return items;
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
