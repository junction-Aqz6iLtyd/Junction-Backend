import { User } from 'src/auth/entity/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  selectedItemId: number;

  @OneToOne(() => User, (user) => user.pet)
  user: User;
}
