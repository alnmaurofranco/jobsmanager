import User from '@database/entities/User';
import { UserProfileRepository } from '@database/repositories/UserProfileRepository';
import { UserRepository } from '@database/repositories/UserRepository';
import HttpException from '@errors/httpException';
import { calculateValueHour } from '@utils/JobUtils';
import { compare, hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import RedisCache from '../implementations/RedisCache';

interface IRequest {
  user_id: string;
  username?: string;
  name?: string;
  avatar?: string;
  email?: string;
  old_password?: string;
  password?: string;
  monthly_budget?: number;
  days_per_week?: number;
  hours_per_day?: number;
  vacation_per_year?: number;
}

class UpdateProfileService {
  private usersRepository = getCustomRepository(UserRepository);
  private userProfileRepository = getCustomRepository(UserProfileRepository);
  private cacheProvider = new RedisCache();

  public async execute({
    user_id,
    username,
    name,
    avatar,
    email,
    old_password,
    password,
    monthly_budget,
    days_per_week,
    hours_per_day,
    vacation_per_year,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findUserById(user_id);

    if (!user) {
      throw new HttpException(400, 'User not found in system.');
    }

    const userWithEmail = await this.usersRepository.findByEmail(email);

    if (userWithEmail && userWithEmail.id !== user_id) {
      throw new HttpException(400, 'E-mail already in use.');
    }

    user.username = username;
    user.email = email;

    if (password && !old_password) {
      throw new HttpException(
        400,
        'You need to inform the old password to set a new password'
      );
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, password);

      if (checkOldPassword) {
        throw new HttpException(400, 'Old password does not match.');
      }

      user.password = await hash(password, 8);
    }

    await this.usersRepository.save(user);

    const userProfile = await this.userProfileRepository.findOne({
      where: {
        user,
      },
    });

    userProfile.name = name;
    userProfile.avatar = avatar;
    userProfile.monthly_budget = monthly_budget;
    userProfile.days_per_week = days_per_week;
    userProfile.hours_per_day = hours_per_day;
    userProfile.vacation_per_year = vacation_per_year;

    const valueHour = calculateValueHour(
      userProfile.vacation_per_year,
      userProfile.hours_per_day,
      userProfile.days_per_week,
      userProfile.monthly_budget
    );

    userProfile.value_hour = valueHour;

    await this.userProfileRepository.save(userProfile);
    await this.cacheProvider.invalidate(`show-profile:${user_id}`);

    return {
      ...user,
      profile: userProfile,
    };
  }
}

export default UpdateProfileService;
