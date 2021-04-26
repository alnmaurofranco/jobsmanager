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
  private ormRepository = getCustomRepository(UserRepository);

  constructor() {
    this.ormRepository;
  }

  public async execute({
    id,
    username,
    email,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const user = await this.ormRepository.findById(id);

    if (!user) {
      throw new HttpException(400, 'not found user with id');
    }

    const userAlready = await this.ormRepository.findOne({
      where: { email },
    });

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

    return await this.ormRepository.save(user);
  }
}

export default UpdateUserService;
