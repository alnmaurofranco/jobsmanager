import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Exclude } from 'class-transformer';
import User from './User';

@Entity('users_profile')
class UserProfile {
  @PrimaryColumn('varchar')
  readonly id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  avatar: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Exclude()
  @Column('uuid')
  user_id: string;

  @Column('int')
  monthly_budget: number;

  @Column('int')
  days_per_week: number;

  @Column('int')
  hours_per_day: number;

  @Column('int')
  vacation_per_year: number;

  @Column('decimal')
  value_hour: number;

  @Exclude()
  @CreateDateColumn({ type: 'time with time zone' })
  created_at: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'time with time zone' })
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default UserProfile;
