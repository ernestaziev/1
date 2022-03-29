import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DefaultStatus } from '../../types';
import { LocationEntity } from './location.entity';
import { RitmStyle } from './ritmStyle.entity';

@Entity()
export class SessionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  phone: string;

  @OneToMany(() => RitmStyle, (ritmStyle) => ritmStyle.session)
  ritm_style: RitmStyle[];

  @OneToMany(() => LocationEntity, (location) => location.session)
  location: LocationEntity[];

  @Column({type: 'timestamp'})
  start_date: Date

  @Column({
    type: 'enum',
    enum: DefaultStatus,
  })
  status: DefaultStatus;

  @CreateDateColumn({type: 'timestamp', nullable: true})
  created_at: Date
}
