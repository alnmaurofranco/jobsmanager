import User from '@database/entities/User';
import { UserRepository } from '@database/repositories/UserRepository';
import HttpException from '@errors/httpException';
import { getCustomRepository } from 'typeorm';
import RedisCache from '../implementations/RedisCache';

interface IRequest {
  user_id: string;
}

class ShowProfileService {
  private usersRepository = getCustomRepository(UserRepository);
  private cacheProvider = new RedisCache();

  public async execute({ user_id }: IRequest): Promise<User> {
    let user = await this.cacheProvider.recover<User>(
      `show-profile:${user_id}`
    );

    if (!user) {
      user = await this.usersRepository.findOne({
        where: { id: user_id },
        relations: ['profile'],
      });

      if (!user) {
        throw new HttpException(404, 'user not found!');
      }

      await this.cacheProvider.save(`show-profile:${user_id}`, user);
    }

    return user;
  }
}

export default ShowProfileService;
