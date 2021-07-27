import User from '@database/entities/User';
import { UserRepository } from '@database/repositories/UserRepository';
import HttpException from '@errors/httpException';
import { getCustomRepository } from 'typeorm';
import bcrypt from 'bcryptjs';

interface IRequest {
  id: string;
  username: string;
  email: string;
  old_password: string;
  password: string;
}

class UpdateUserService {
  private usersRepository = getCustomRepository(UserRepository);

  public async execute({
    id,
    username,
    email,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findUserById(id);

    if (!user) {
      throw new HttpException(400, 'not found user with id');
    }

    const userAlready = await this.usersRepository.findByEmail(email);

    if (userAlready) {
      throw new HttpException(400, 'E-mail address already used');
    }

    user.username = username;
    user.email = email;

    if (password && old_password) {
      const checkOldPassword = await bcrypt.compare(old_password, password);

      if (checkOldPassword) {
        throw new HttpException(400, 'Old password does not match.');
      }

      user.password = await bcrypt.hash(password, 8);
    }

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
