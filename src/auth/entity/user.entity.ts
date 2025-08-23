import { ChatMessage } from 'src/ai/entity/chat-message.entity';
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

  @OneToMany(() => ChatMessage, (message) => message.user)
  chatMessages: ChatMessage[];

  @OneToMany(() => WordList, (wordList) => wordList.user)
  wordLists: WordList[];

  @OneToOne(() => Pet, (pet) => pet.user, { cascade: true })
  @JoinColumn()
  pet: Pet;
}
