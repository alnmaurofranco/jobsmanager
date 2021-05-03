import User from '@database/entities/User';
import { UserProfileRepository } from '@database/repositories/UserProfileRepository';
import { UserRepository } from '@database/repositories/UserRepository';
import HttpException from '@errors/httpException';
import bcrypt from 'bcryptjs';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  name: string;
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}

class SignupService {
  private usersRepository = getCustomRepository(UserRepository);
  private userProfilesRepository = getCustomRepository(UserProfileRepository);

  public async execute({
    name,
    email,
    password,
    username,
    confirm_password,
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

    return user;
  }
}

export default SignupService;
