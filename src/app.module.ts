import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/entity/user.entity';
import { AiModule } from './ai/ai.module';
import { ChatMessage } from './ai/entity/chat-message.entity';
import { WordModule } from './word/word.module';
import { Word } from './word/entity/word.entity';
import { WordList } from './word/entity/word-list.entity';
import { PetModule } from './pet/pet.module';
import { DecoModule } from './deco/deco.module';
import { Pet } from './pet/entity/pet.entity';
import { Deco } from './deco/entity/deco.entity';
import { GoalModule } from './goal/goal.module';
import { Goal } from './goal/entity/goal.entity';
import { QuizModule } from './quiz/quiz.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, ChatMessage, Word, WordList, Pet, Deco, Goal],
      synchronize: true,
    }),
    AuthModule,
    AiModule,
    WordModule,
    PetModule,
    DecoModule,
    GoalModule,
    QuizModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
