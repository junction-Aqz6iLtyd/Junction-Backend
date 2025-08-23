import { User } from 'src/auth/entity/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Goal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column('simple-json')
  week: number[];

  @Column({ default: false })
  isEveryday: boolean;

  @ManyToOne(() => User, (user) => user.goals)
  user: User;
}
