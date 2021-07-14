import User from '@database/entities/User';
import { UserRepository } from '@database/repositories/UserRepository';
import HttpException from '@errors/httpException';
import bcrypt from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import RedisCache from '../implementations/RedisCache';

interface IRequest {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}

class CreateUserService {
  private usersRepository = getCustomRepository(UserRepository);
  private cacheProvider = new RedisCache();

  public async execute({
    username,
    email,
    password,
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
    await this.cacheProvider.invalidatePrefix('users-list');

    return user;
  }
}

export default CreateUserService;
