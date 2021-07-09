import { v4 as uuid } from 'uuid';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user_tokens')
class UserToken {
  @PrimaryColumn('varchar')
  id: string;

  @Column('varchar')
  @Generated('uuid')
  token: string;

  @Column('varchar')
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id && !this.token) {
      this.id = uuid();
      this.token = uuid();
    }
  }
}

export default UserToken;
