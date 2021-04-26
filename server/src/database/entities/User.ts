import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import Job from './Job';
import UserProfile from './UserProfile';

import { Exclude } from 'class-transformer';

@Entity('users')
class User {
  @PrimaryColumn('varchar')
  id: string;

  @Column('varchar')
  username: string;

  @Column('varchar')
  email: string;

  @Exclude()
  @Column('varchar')
  password: string;

  @Column('boolean')
  email_verification: boolean;

  @OneToMany(() => Job, (job) => job.user)
  jobs: Job[];

  @OneToOne(() => UserProfile, (up) => up.user)
  profile: UserProfile;

  @CreateDateColumn({ type: 'time with time zone' })
  created_at: Date;

  @UpdateDateColumn({ type: 'time with time zone' })
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default User;
