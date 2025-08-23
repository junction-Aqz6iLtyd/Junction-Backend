import { User } from 'src/auth/entity/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Goal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: [] })
  week: number[];

  @OneToOne(() => User, (user) => user.goal)
  user: User;
}
