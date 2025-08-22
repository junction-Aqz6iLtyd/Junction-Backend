import { User } from 'src/auth/entity/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

export type SENDER_TYPE = 'user' | 'ai';

@Entity()
export class ChatMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.chatMessages)
  user: User;

  @Column('text')
  content: string;

  @Column({ default: 'ai' })
  senderType: SENDER_TYPE;

  @CreateDateColumn()
  createdAt: Date;
}
