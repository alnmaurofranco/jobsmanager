import { getCustomRepository } from 'typeorm';
import { UserRepository } from '@database/repositories/UserRepository';
import { UserTokenRepository } from '@database/repositories/UserTokenRepository';
import HttpException from '@errors/httpException';
import { addHours, isAfter } from 'date-fns';

interface IRequest {
  token: string;
}

class EmailConfirmationProfileService {
  private userRepository = getCustomRepository(UserRepository);
  private userTokenRepository = getCustomRepository(UserTokenRepository);

  public async execute({ token }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new HttpException(400, 'User token does not exists.');
    }

    const user = await this.userRepository.findById(userToken.user_id);

    if (!user) {
      throw new HttpException(400, 'User does not exists.');
    }

    const compareDate = addHours(userToken.created_at, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new HttpException(401, 'Token is expired!');
    }

    user.email_verification = true;

    await this.userRepository.save(user);
  }
}

export default EmailConfirmationProfileService;
