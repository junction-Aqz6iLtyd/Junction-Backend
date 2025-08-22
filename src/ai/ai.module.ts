import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { ChatMessageService } from './chat.service';
import { ChatMessage } from './entity/chat-message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ChatMessage])],
  providers: [AiService, ChatMessageService],
  controllers: [AiController],
})
export class AiModule {}
