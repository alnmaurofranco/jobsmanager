import { EntityRepository, Repository } from 'typeorm';
import User from '@database/entities/User';

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

  public async findByEmail(
    email: string,
    isProfile = false
  ): Promise<User | undefined> {
    if (isProfile === true) {
      return await this.findOne({
        where: { email },
        relations: ['profile'],
      });
    }

    return await this.findOne({ where: { email } });
  }
}

export { UserRepository };
