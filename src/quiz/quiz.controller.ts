import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { LoginGuard } from 'src/auth/security/auth.guard';
import { Request } from 'express';
import { Payload } from 'src/auth/security/payload.interface';

@Controller('quiz')
export class QuizController {
  constructor(private quizService: QuizService) {}

  @Get('sentence/quiz1')
  quiz1() {
    return this.quizService.makeSentenseQuiz1();
  }

  @Get('sentence/quiz2')
  quiz2() {
    return this.quizService.makeSentenseQuiz2();
  }

  @Get('voca/quiz1')
  @UseGuards(LoginGuard)
  vocaQuiz1(@Req() req: Request) {
    const payload = req.user as Payload;
    return this.quizService.makeVocaQuiz1(payload.id);
  }
}
