import { isAfter, addMinutes, addHours } from 'date-fns';
import HttpException from '@errors/httpException';
import { UserTokenRepository } from '@database/repositories/UserTokenRepository';
import { UserRepository } from '@database/repositories/UserRepository';
import User from '@database/entities/User';
import UserToken from '../database/entities/UserToken';

interface IEmailUtils {
  user: User;
  userToken: UserToken;
}

const EmailAccountService = async (
  token: string,
  usrToken: UserTokenRepository,
  usr: UserRepository,
  num: number,
  diffHourOrMinute = false
): Promise<IEmailUtils> => {
  const userToken = await usrToken.findByToken(token);

  if (!userToken) {
    throw new HttpException(400, 'Token does not exists.');
  }

  const user = await usr.findUserById(userToken.user_id);

  if (!user) {
    throw new HttpException(400, 'User does not exists.');
  }

  const tokenCreatedAt = userToken.created_at;

  const compareDate = diffHourOrMinute
    ? addHours(tokenCreatedAt, num)
    : addMinutes(tokenCreatedAt, num);

  if (isAfter(Date.now(), compareDate)) {
    await usrToken.remove(userToken);
    throw new HttpException(401, 'Token is expired!');
  }

  return { user, userToken };
};

export { EmailAccountService };
