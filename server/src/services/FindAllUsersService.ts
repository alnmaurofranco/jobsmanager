import { UserRepository } from '@database/repositories/UserRepository';
import HttpException from '@errors/httpException';
import { getCustomRepository } from 'typeorm';
import User from '@database/entities/User';
import RedisCache from '../implementations/RedisCache';

class FindAllUsersService {
  private usersRepository = getCustomRepository(UserRepository);

  private cacheProvider = new RedisCache();

  public async execute(user_id: string) {
    let users = await this.cacheProvider.recover<User[]>(
      `users-list:${user_id}`
    );

    if (!users) {
      users = await this.usersRepository.find({
        relations: ['jobs', 'profile'],
      });

      if (users.length === 0 || users.length <= 0) {
        throw new HttpException(404, 'not found users');
      }

      await this.cacheProvider.save(`users-list:${user_id}`, users);
    }

    return users;
  }
}

export default FindAllUsersService;
