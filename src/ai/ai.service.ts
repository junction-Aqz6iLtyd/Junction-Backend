import { Injectable, InternalServerErrorException } from '@nestjs/common';
import OpenAI from 'openai';
import { ChatMessageService } from './chat.service';

@Injectable()
export class AiService {
  constructor(private chatMessageService: ChatMessageService) {}

  async generateAnswer(content: string): Promise<string> {
    const apiKey = process.env.SOLAR_API_KEY;
    if (!apiKey)
      throw new InternalServerErrorException('API key가 존재하지 않습니다');
    const openai = new OpenAI({
      apiKey,
      baseURL: 'https://api.upstage.ai/v1',
    });

    const chatCompletion = await openai.chat.completions.create({
      model: 'solar-pro2',
      messages: [
        {
          role: 'user',
          content: content,
        },
      ],
      stream: true,
    });

    let data = '';
    for await (const chunk of chatCompletion) {
      data += chunk.choices[0]?.delta?.content || '';
    }
    return data;
  }

  // TODO: 질문 생성
}
