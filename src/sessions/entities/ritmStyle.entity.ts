import { DefaultStatus } from 'src/types';
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
export class RitmStyle extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  title: string;

  @Column({
    type: 'enum',
    enum: DefaultStatus,
  })
  status: DefaultStatus;
  
  @Column({type: 'timestamp'})
  @CreateDateColumn()
  created_at: Date

  @ManyToOne(() => SessionEntity, (session) => session.ritm_style)
  session: SessionEntity;
}
