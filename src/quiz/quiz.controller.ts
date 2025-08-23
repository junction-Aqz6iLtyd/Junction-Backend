import { Controller, Get } from '@nestjs/common';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private quizService: QuizService) {}

  @Get('quiz1')
  quiz1() {
    return this.quizService.makeQuiz1();
  }

  @Get('quiz2')
  quiz2() {
    return this.quizService.makeQuiz2();
  }
}
