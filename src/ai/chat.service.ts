import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatMessage } from './entity/chat-message.entity';
import { Repository } from 'typeorm';
import { BaseService } from 'src/common/base.service';

@Injectable()
export class ChatMessageService extends BaseService<ChatMessage> {
  constructor(
    @InjectRepository(ChatMessage) private repo: Repository<ChatMessage>,
  ) {
    super(repo);
  }
}
