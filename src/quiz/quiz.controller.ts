import { Controller, Get } from '@nestjs/common';
import { QuizService } from './quiz.service';

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
  vocaQuiz1() {
    return this.quizService.makeVocaQuiz1();
  }
}
