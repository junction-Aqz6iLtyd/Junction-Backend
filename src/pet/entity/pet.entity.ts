import { User } from 'src/auth/entity/user.entity';
import { Deco } from 'src/deco/entity/deco.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Pet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 1 })
  selectedDecoId: number;

  @ManyToMany(() => Deco, (deco) => deco.pets, { cascade: true })
  @JoinTable() // 소유자 쪽에만 작성 (중간 테이블 자동 생성)
  decos: Deco[];

  @OneToOne(() => User, (user) => user.pet)
  user: User;
}
