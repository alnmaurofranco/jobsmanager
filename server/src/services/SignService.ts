import User from '@database/entities/User';
import { UserRepository } from '@database/repositories/UserRepository';
import HttpException from '@errors/httpException';
import { generateToken } from '@utils/AuthSecurity';
import bcrypt from 'bcryptjs';
import { format } from 'date-fns';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class SignService {
  private usersRepository = getCustomRepository(UserRepository);

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findOne({
      where: { email },
      relations: ['profile'],
    });

    if (!user) {
      throw new HttpException(400, 'Incorrect email/password combination.');
    }

    const passMatched = bcrypt.compareSync(password, user.password);

    if (!passMatched) {
      throw new HttpException(400, 'Incorrect email/password combination.');
    }

    if (user.active === false) {
      const desactiveDate = format(user.updated_at, 'dd MMMM');
      throw new HttpException(
        400,
        `This account was disabled on ${desactiveDate}`
      );
    }

    const token = generateToken(user.id);

    return {
      user,
      token,
    };
  }
}

export default SignService;
