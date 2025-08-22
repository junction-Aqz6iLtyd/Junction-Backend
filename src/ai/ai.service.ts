import { Injectable, InternalServerErrorException } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  async ask(content: string): Promise<string> {
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
}
