import { ChatMessage } from 'src/ai/entity/chat-message.entity';
import { Goal } from 'src/goal/entity/goal.entity';
import { Pet } from 'src/pet/entity/pet.entity';
import { WordList } from 'src/word/entity/word-list.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum Level {
  TOEFL = 'TOEFL',
  GRE_VERBAL = 'GRE verbal test',
  HIGH_SCHOOL = '고교 필수 어휘',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 1000 })
  point: number;

  @Column({
    type: 'enum',
    enum: Level,
    default: Level.TOEFL,
  })
  level: Level;

  @OneToMany(() => ChatMessage, (message) => message.user)
  chatMessages: ChatMessage[];

  @OneToMany(() => WordList, (wordList) => wordList.user)
  wordLists: WordList[];

  @OneToOne(() => Pet, (pet) => pet.user, { cascade: true })
  @JoinColumn()
  pet: Pet;

  @OneToMany(() => Goal, (goal) => goal.user, { cascade: true })
  goals: Goal[];
}
