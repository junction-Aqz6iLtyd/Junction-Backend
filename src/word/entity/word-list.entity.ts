import { User } from 'src/auth/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Word } from './word.entity';

@Entity()
export class WordList {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.wordLists)
  user: User;

  @Column()
  name: string;

  @OneToMany(() => Word, (word) => word.wordList)
  words: Word[];

  @CreateDateColumn()
  createdAt: Date;
}
