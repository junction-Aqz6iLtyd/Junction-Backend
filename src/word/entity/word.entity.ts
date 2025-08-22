import { User } from 'src/auth/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Word {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.words)
  user: User;

  @Column()
  english: string;

  @Column()
  korean: string;

  @Column({ default: false })
  isHighlight: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
