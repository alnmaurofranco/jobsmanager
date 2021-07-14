import { getCustomRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import { UserTokenRepository } from '@database/repositories/UserTokenRepository';
import { UserRepository } from '@database/repositories/UserRepository';
import { EmailAccountService } from '@utils/EmailUtils';

interface IRequest {
  token: string;
  newPassword: string;
}

class ResetPasswordService {
  private userRepository = getCustomRepository(UserRepository);
  private userTokenRepository = getCustomRepository(UserTokenRepository);

  public async execute({ token, newPassword }: IRequest): Promise<void> {
    const { user, userToken } = await EmailAccountService(
      token,
      this.userTokenRepository,
      this.userRepository,
      15
    );

    user.password = bcrypt.hashSync(newPassword, 8);

    await this.userRepository.save(user);
    await this.userTokenRepository.remove(userToken);
  }
}

export default ResetPasswordService;
