import { getCustomRepository } from 'typeorm';
import { UserRepository } from '@database/repositories/UserRepository';
import HttpException from '@errors/httpException';
import { UserTokenRepository } from '@database/repositories/UserTokenRepository';
import path from 'path';
import MailProvider from '../providers/MailProvider';

interface IRequest {
  email: string;
  urlHostToSendMail: string;
}

class SendForgotPasswordService {
  private userRepository = getCustomRepository(UserRepository);

  private userTokenRepository = getCustomRepository(UserTokenRepository);

  private mailProvider = new MailProvider();

  public async execute({ email, urlHostToSendMail }: IRequest): Promise<void> {
    const user = await this.userRepository.findByEmail(email, true);

    if (!user) {
      throw new HttpException(400, 'User does not exists.');
    }

    const { token } = await this.userTokenRepository.generate(user.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'email/forgot_password.ejs'
    );

    await this.mailProvider.sendMail({
      to: {
        name: user.profile.name,
        email: user.email,
      },
      subject: `Recuperação de senha da JobsManager`,
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.profile.name,
          link: `${process.env.API_URL_ACCESS_CORS}/account/reset/password?token=${token}`,
          url: `${process.env.NODE_HTTP}${urlHostToSendMail}`,
        },
      },
    });
  }
}

export default SendForgotPasswordService;
