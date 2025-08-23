import { forwardRef, Module } from '@nestjs/common';
import { DecoController } from './deco.controller';
import { DecoService } from './deco.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deco } from './entity/deco.entity';
import { AuthModule } from 'src/auth/auth.module';
import { PetModule } from 'src/pet/pet.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Deco]),
    AuthModule,
    forwardRef(() => PetModule),
  ],
  controllers: [DecoController],
  providers: [DecoService],
  exports: [DecoService],
})
export class DecoModule {}
