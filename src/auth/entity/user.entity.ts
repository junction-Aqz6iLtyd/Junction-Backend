import { ChatMessage } from 'src/ai/entity/chat-message.entity';
import { WordList } from 'src/word/entity/word-list.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToMany(() => ChatMessage, (message) => message.user)
  chatMessages: ChatMessage[];

  @OneToMany(() => WordList, (wordList) => wordList.user)
  wordLists: WordList[];
}
