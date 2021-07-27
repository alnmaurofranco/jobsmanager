import { getCustomRepository } from 'typeorm';
import path from 'path';
import bcrypt from 'bcryptjs';
import User from '@database/entities/User';
import { UserProfileRepository } from '@database/repositories/UserProfileRepository';
import { UserRepository } from '@database/repositories/UserRepository';
import { UserTokenRepository } from '@database/repositories/UserTokenRepository';
import HttpException from '@errors/httpException';
import MailProvider from '../providers/MailProvider';

interface IRequest {
  name: string;
  username: string;
  email: string;
  password: string;
  confirm_password: string;
  urlHostToSendMail: string;
}

class SignupService {
  private usersRepository = getCustomRepository(UserRepository);

  private userProfilesRepository = getCustomRepository(UserProfileRepository);

  private userTokenRepository = getCustomRepository(UserTokenRepository);

  private mailProvider = new MailProvider();

  public async execute({
    name,
    email,
    password,
    username,
    confirm_password,
    urlHostToSendMail,
  }: IRequest): Promise<User> {
    const userAlready = await this.usersRepository.findByEmail(email);

    if (userAlready) {
      throw new HttpException(400, 'E-mail address already used');
    }

    if (password !== confirm_password) {
      throw new HttpException(400, 'Password incorret');
    }

    const hashedPass = bcrypt.hashSync(password, 8);

    const user = this.usersRepository.create({
      email,
      username,
      password: hashedPass,
    });

    await this.usersRepository.save(user);

    const profile = this.userProfilesRepository.create({
      user_id: user.id,
      name,
    });

    await this.userProfilesRepository.save(profile);

    const { token } = await this.userTokenRepository.generate(user.id);

    const confirmationAccountTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'email/confirmation_user.ejs'
    );

    await this.mailProvider.sendMail({
      to: {
        name: profile.name,
        email: user.email,
      },
      subject: `Confirme seu endereço de e-mail da JobsManager`,
      templateData: {
        file: confirmationAccountTemplate,
        variables: {
          name: profile.name,
          link: `${process.env.API_URL_ACCESS_CORS}/email/confirmation?token=${token}`,
          url: `${process.env.NODE_HTTP}${urlHostToSendMail}`,
        },
      },
    });

    return user;
  }
}

export default SignupService;
