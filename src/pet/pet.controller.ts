import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { LoginGuard } from 'src/auth/security/auth.guard';
import { PetService } from './pet.service';
import { Payload } from 'src/auth/security/payload.interface';
import { Request } from 'express';

@Controller('pet')
export class PetController {
  constructor(private petService: PetService) {}

  @Get()
  @UseGuards(LoginGuard)
  async getOwnPet(@Req() req: Request) {
    const payload = req.user as Payload;
    const pet = await this.petService.getByUserId(payload.id);
    if (!pet) return this.petService.save({ user: { id: payload.id } });
    return pet;
  }
}
