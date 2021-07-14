import { getCustomRepository } from 'typeorm';
import { UserRepository } from '@database/repositories/UserRepository';
import { UserTokenRepository } from '@database/repositories/UserTokenRepository';
import { EmailAccountService } from '@utils/EmailUtils';

interface IRequest {
  token: string;
}

class EmailConfirmationProfileService {
  private userRepository = getCustomRepository(UserRepository);
  private userTokenRepository = getCustomRepository(UserTokenRepository);

  public async execute({ token }: IRequest): Promise<void> {
    const { user, userToken } = await EmailAccountService(
      token,
      this.userTokenRepository,
      this.userRepository,
      2,
      true
    );

    user.email_verification = true;

    await this.userRepository.save(user);
    await this.userTokenRepository.remove(userToken);
  }
}

export default EmailConfirmationProfileService;
