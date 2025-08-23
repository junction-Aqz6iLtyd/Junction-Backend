import { Pet } from 'src/pet/entity/pet.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

export type DecoType = 'species' | 'extra';

@Entity()
export class Deco {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'species' })
  decoType: DecoType;

  @Column()
  itemId: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @ManyToMany(() => Pet, (pet) => pet.decos)
  pets: Pet[];
}
