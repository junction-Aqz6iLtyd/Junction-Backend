import { Controller, Get, Query } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private aiService: AiService) {}

  @Get('test')
  async test(@Query('content') content: string): Promise<string> {
    return await this.aiService.ask(content);
  }
}
