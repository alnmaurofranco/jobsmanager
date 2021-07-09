import { EntityRepository, Repository } from 'typeorm';
import UserToken from '../entities/UserToken';

@EntityRepository(UserToken)
class UserTokenRepository extends Repository<UserToken> {
  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.create({
      user_id,
    });

    return await this.save(userToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    return await this.findOne({
      where: {
        token,
      },
    });
  }
}

export { UserTokenRepository };
