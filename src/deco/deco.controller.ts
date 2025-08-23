import { Controller, Get } from '@nestjs/common';
import { DecoService } from './deco.service';

@Controller('deco')
export class DecoController {
  constructor(private decoService: DecoService) {}

  @Get()
  getAllDecos() {
    // TODO: 내가 가지고 있는거
    return this.decoService.find({});
  }
}
