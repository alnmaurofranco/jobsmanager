import { UserRepository } from '@database/repositories/UserRepository';
import HttpException from '@errors/httpException';
import { getCustomRepository } from 'typeorm';
import RedisCache from '../implementations/RedisCache';
import User from '@database/entities/User';

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
      user = await this.usersRepository
        .createQueryBuilder('user')
        .innerJoinAndSelect('user.profile', 'profile')
        .select([
          'user.id',
          'user.username',
          'user.email',
          'user.active',
          'user.email_verification',
          'profile.name',
          'profile.avatar',
          'profile.monthly_budget',
          'profile.days_per_week',
          'profile.hours_per_day',
          'profile.vacation_per_year',
          'profile.value_hour',
          'user.created_at',
          'user.updated_at',
        ])
        .where('user.id = :id', { id: user_id })
        .getOne();

      if (!user) {
        throw new HttpException(404, 'user not found!');
      }

      await this.cacheProvider.save(`show-profile:${user_id}`, user);
    }

    return user;
  }
}

export default ShowProfileService;
