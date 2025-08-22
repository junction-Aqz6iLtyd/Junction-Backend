import { ChatMessage } from 'src/ai/entity/chat-message.entity';
import { Word } from 'src/word/entity/word.entity';
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

  @OneToMany(() => Word, (word) => word.user)
  words: Word[];
}
