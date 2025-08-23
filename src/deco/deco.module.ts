import { Module } from '@nestjs/common';
import { DecoController } from './deco.controller';
import { DecoService } from './deco.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deco } from './entity/deco.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Deco])],
  controllers: [DecoController],
  providers: [DecoService],
  exports: [DecoService],
})
export class DecoModule {}
