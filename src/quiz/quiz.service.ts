import { Injectable } from '@nestjs/common';
import { english_by_basic_sentence as basic_sentences } from './config/english_by_basic_sentence';

const setting = {
  quiz1_count: 3,
  quiz2_count: 3,
};

@Injectable()
export class QuizService {
  rand(length: number) {
    return Math.floor(Math.random() * length);
  }

  getRandomIndexArray(array: any[], count: number) {
    const indexArray: number[] = [];
    for (let i = 0; i < array.length; i++) indexArray.push(i);
    const result: any[] = [];
    for (let i = 0; i < count; i++) {
      const index = this.rand(indexArray.length);
      const item = indexArray.splice(index, 1);
      result.push(array[item.length == 0 ? 0 : item[0]]);
    }
    return result;
  }

  extractInsideI(text: string): string[] {
    const regex = /<i>(.*?)<\/i>/g;
    const matches: string[] = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      matches.push(match[1]); // 그룹 1 = 태그 안의 내용
    }
    return matches;
  }

  extractOutsideI(text: string): string {
    return text.replace(/<i>.*?<\/i>/g, '???');
  }

  getRandItem(arr: any[]) {
    return arr[this.rand(arr.length)];
  }

  makeQuiz1() {
    const expression_list =
      basic_sentences[this.rand(basic_sentences.length)].expression_list;
    const selectedExpressions = this.getRandomIndexArray(
      expression_list,
      setting.quiz1_count,
    );
    const answerIndex = this.rand(setting.quiz1_count);
    const exercise_list = selectedExpressions[answerIndex].basic_exercise_list;
    const quiz = exercise_list[this.rand(exercise_list.length)].kor_sentence;
    const questions: string[] = [];
    for (let i = 0; i < setting.quiz1_count; i++)
      questions.push(selectedExpressions[i].eng_expression);
    return {
      quiz,
      answer: answerIndex,
      questions,
    };
  }

  makeQuiz2() {
    const examples: string[] = [];
    for (let i = 0; i < setting.quiz2_count; i++) {
      const expression_list =
        basic_sentences[this.rand(basic_sentences.length)].expression_list;
      examples.push(this.getRandItem(expression_list).example);
    }
    const answerIndex = this.rand(setting.quiz2_count);
    const quiz = this.extractOutsideI(examples[answerIndex]);
    const questions: string[] = [];
    for (let i = 0; i < setting.quiz2_count; i++) {
      const example = examples[i];
      questions.push(this.extractInsideI(example)[0]);
    }
    return {
      quiz,
      answer: answerIndex,
      questions,
    };
  }
}
