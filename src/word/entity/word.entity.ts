import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WordList } from './word-list.entity';

@Entity()
export class Word {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => WordList, (wordList) => wordList.words)
  wordList: WordList;

  @Column()
  english: string;

  @Column()
  korean: string;

  @Column({ default: false })
  isHighlight: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
