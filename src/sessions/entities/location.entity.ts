import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SessionEntity } from './session.entity';

@Entity()
export class LocationEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  arrangment: string;
  
  @Column({type: 'timestamp'})
  @CreateDateColumn()
  created_at: Date

  @ManyToOne(() => SessionEntity, (session) => session.location)
  session: SessionEntity;
}
