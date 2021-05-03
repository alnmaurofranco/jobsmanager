import User from '@database/entities/User';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  public async findByRelations(id: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        id,
      },
      relations: ['profile'],
    });

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  public async findUserById(id: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.findOne({ where: { email } });

    return user;
  }
}

export { UserRepository };
